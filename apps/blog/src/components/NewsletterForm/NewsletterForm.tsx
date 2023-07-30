import useTranslation from 'next-translate/useTranslation'

import { H3 } from '../Headings'

const NewsletterForm = () => {
  const { t } = useTranslation('common')

  return (
    <section>
      <div className="flex items-start w-full px-4 py-3 border border-b border-gray-200 sm:justify-between bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="items-center justify-center w-full sm:flex">
          <div className="max-w-lg">
            <header>
              <H3 as="h2">{t('newsletter.title')}</H3>
            </header>
            <p className="mb-4 font-medium text-gray-500 sm:mb-0 dark:text-white md:mb-0">
              {t('newsletter.description')}
            </p>
          </div>
          <form
            action="https://app.convertkit.com/forms/5432765/subscriptions"
            method="post"
            min-width="400 500 600 700 800"
            className="seva-form formkit-form sm:pl-10"
            data-sv-form="5432765"
            data-uid="1d0219ec29"
            data-format="inline"
            data-version="5"
          >
            <div className="flex items-center md:mx-auto sm:space-y-0">
              <ul
                className="formkit-alert formkit-alert-error"
                data-element="errors"
                data-group="alert"
              ></ul>
              <div className="relative w-full mr-3">
                <label
                  htmlFor="email_address"
                  className="block mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  {t('newsletter.form.input.label')}
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:w-64 lg:w-96 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email_address"
                  placeholder={t('newsletter.form.input.placeholder')}
                />
              </div>
              <div>
                <button
                  data-element="submit"
                  type="submit"
                  className="formkit-submit formkit-submit w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-indigo-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t('newsletter.form.submit.text')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewsletterForm
