import useTranslation from 'next-translate/useTranslation'

import { H3 } from '../Headings'

const NewsletterForm = () => {
  const { t } = useTranslation('common')

  return (
    <section>
      <div className="flex w-full items-start border border-b border-gray-200 bg-white px-4 py-3 sm:justify-between dark:border-gray-800 dark:bg-gray-900">
        <div className="w-full items-center justify-center sm:flex">
          <div className="max-w-lg">
            <header>
              <H3 as="h2">{t('newsletter.title')}</H3>
            </header>
            <p className="mb-4 font-medium text-gray-500 sm:mb-0 md:mb-0 dark:text-white">
              {t('newsletter.description')}
            </p>
          </div>
          <div className="sm:pl-10">
            <div className="flex items-center sm:space-y-0 md:mx-auto">
              <div>
                <a
                  href="https://thedaviddias.substack.com"
                  className="formkit-submit formkit-submit w-full cursor-pointer rounded-lg bg-indigo-800 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t('newsletter.form.submit.text')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterForm
