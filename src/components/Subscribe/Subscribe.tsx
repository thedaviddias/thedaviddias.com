import useTranslation from 'next-translate/useTranslation'
import { FormEvent, useRef, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { H3 } from '@/components/Headings'
import { Loader } from '@/components/Loader'
import { Paragraph } from '@/components/Paragraph'
import SuccessMessage from '@/components/SuccessMessage/SuccessMessage'

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

export type Subscribers = {
  count: number
}

export type Views = {
  total: number
}

export const Subscribe = () => {
  const { t } = useTranslation('common')
  const [form, setForm] = useState<FormState>()
  const inputEl = useRef<HTMLInputElement>(null)

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setForm({ state: Form.Loading })

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current && inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      })
      return
    }

    if (inputEl.current) {
      inputEl.current.value = ''
    }

    setForm({
      state: Form.Success,
      message: t('newsletter.form.success.text'),
    })
  }

  return (
    <section className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-4 h-full border relative">
      <div className="text-center">
        <header>
          <H3 as="h2">{t('newsletter.title')}</H3>
        </header>
        <Paragraph className="my-1 text-gray-800 dark:text-gray-200">
          {t('newsletter.description')}
        </Paragraph>
        <form className="relative my-4" onSubmit={subscribe}>
          <div className="max-w-lg relative mx-auto">
            <input
              ref={inputEl}
              aria-label={t('newsletter.form.input.label')}
              placeholder={t('newsletter.form.input.placeholder')}
              type="email"
              autoComplete="email"
              required
              className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pr-32"
            />
            <button
              className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
              type="submit"
            >
              {form?.state === Form.Loading ? <Loader /> : t('newsletter.form.submit.text')}
            </button>
            {form?.state === Form.Error ? (
              <ErrorMessage>{form.message}</ErrorMessage>
            ) : form?.state === Form.Success ? (
              <SuccessMessage>{form.message}</SuccessMessage>
            ) : null}
          </div>
        </form>

        <p className="text-sm text-gray-800 dark:text-gray-200">
          <CustomLink
            href="https://www.getrevue.co/profile/thedaviddias"
            className="dark:!text-white"
          >
            {t('newsletter.all_issues')}
          </CustomLink>
        </p>
      </div>
    </section>
  )
}
