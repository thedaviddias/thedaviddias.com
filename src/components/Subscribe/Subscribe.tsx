// // import ErrorMessage from 'components/ErrorMessage'
// // import LoadingSpinner from 'components/LoadingSpinner'
// // import SuccessMessage from 'components/SuccessMessage'
// // import { trackGoal } from 'fathom-client'
// // import { Form, FormState, Subscribers } from 'lib/types'
// import { useRef, useState } from 'react'
// import useSWR from 'swr'

// import fetcher from '@/utils/fetcher'

// import { CustomLink } from '../CustomLink'
// import { H3 } from '../Headings'

// export const Subscribe = () => {
//   const [form, setForm] = useState()
//   const inputEl = useRef(null)

//   const { data } = useSWR('/api/subscribers', fetcher)
//   const subscriberCount = new Number(data?.count)

//   const subscribe = async (e) => {
//     e.preventDefault()
//     setForm({ state: Form.Loading })

//     const res = await fetch('/api/subscribe', {
//       body: JSON.stringify({
//         email: inputEl.current.value,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     })

//     const { error } = await res.json()
//     if (error) {
//       setForm({
//         state: Form.Error,
//         message: error,
//       })
//       return
//     }

//     // trackGoal('JYFUFMSF', 0)
//     inputEl.current.value = ''
//     setForm({
//       // state: Form.Success,
//       message: `Hooray! You're now on the list.`,
//     })
//   }

//   return (
//     <div className="border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 text-center">
//       <H3 as="h2">Subscribe to my Newsletter</H3>
//       <p className="my-1 text-gray-800 dark:text-gray-200">
//         Get emails from me about web development, tech, and early access to new articles.
//       </p>
//       <form className="relative my-4" onSubmit={subscribe}>
//         <div className="max-w-lg relative mx-auto">
//           <input
//             ref={inputEl}
//             aria-label="Email for newsletter"
//             placeholder="username@email.com"
//             type="email"
//             autoComplete="email"
//             required
//             className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-32"
//           />
//           <button
//             className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
//             type="submit"
//           >
//             {/* {form.state === Form.Loading ? <LoadingSpinner /> : 'Subscribe'} */}
//           </button>
//         </div>
//       </form>
//       {/* {form.state === Form.Error ? (
//         <ErrorMessage>{form.message}</ErrorMessage>
//       ) : form.state === Form.Success ? (
//         <SuccessMessage>{form.message}</SuccessMessage>
//       ) : ( */}
//       <p className="text-sm text-gray-800 dark:text-gray-200">
//         {`${subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'} subscribers – `}
//         <CustomLink href="/newsletter">Access all issues</CustomLink>
//       </p>
//       {/* )} */}
//     </div>
//   )
// }

export const Subscribe = () => {
  return <div>Subscribe</div>
}
