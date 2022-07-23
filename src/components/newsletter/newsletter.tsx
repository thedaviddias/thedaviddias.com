import { H2 } from '../heading'

export const Newsletter = () => {
  return (
    <section className="my-12 bg-gray-100 text-black dark:bg-gray-800 dark:text-white transition-colors px-4 sm:px-8 pt-6 pb-6 rounded !mb-8 print:hidden">
      <div className="max-w-[37rem] w-full lg:mt-10 lg:mb-8 mx-auto block">
        <H2 className="h2-title mt-0 mb-0 mb-2 lg:text-center lg:text-4xl">
          Sign up to my newsletter
        </H2>
        <form>
          <input aria-label="Newsletter" type="email" />
        </form>
      </div>
    </section>
  )
}
