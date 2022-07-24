import { FormEvent, useState } from 'react'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { H2 } from '../Heading'

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form
  message?: string
}

export const Newsletter = () => {
  const [form, setForm] = useState<FormState>({ state: Form.Initial })
  const { data } = useSWR('/api/newsletter/subscribers', fetcher)

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setForm({ state: Form.Loading })

    const res = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: e.currentTarget.elements['email'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error, message } = await res.json()
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      })
      return
    }

    setForm({
      state: Form.Success,
      message,
    })
  }

  return (
    <section className="my-12 bg-gray-100 text-black dark:bg-gray-800 dark:text-white transition-colors px-4 sm:px-8 pt-6 pb-6 rounded !mb-8 print:hidden">
      <div className="max-w-[37rem] w-full lg:mt-10 lg:mb-8 mx-auto block">
        <H2 className="h2-title mt-0 mb-2 lg:text-center lg:text-4xl">Sign up to my newsletter</H2>
        <p>Get emails from me about web development, expatriation and tech!</p>
        <form onSubmit={subscribe}>
          <input
            aria-label="Newsletter"
            type="email"
            id="email"
            name="email"
            className="px-4 py-3 rounded-lg"
          />
          <button aria-label="Subscribe" type="submit" name="subscribe">
            Join {data?.count}+ subscribers
          </button>
        </form>
        {form.state === Form.Success && <p>{form.message}</p>}
        {form.state === Form.Error && <p>{form.message} 😕</p>}
      </div>
    </section>
  )
}
