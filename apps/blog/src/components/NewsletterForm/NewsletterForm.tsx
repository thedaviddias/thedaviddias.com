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
          <div className="sm:pl-10">
            <div className="flex items-center md:mx-auto sm:space-y-0">
              <div>
                <a
                  href="https://thedaviddias.substack.com"
                  className="formkit-submit formkit-submit w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-indigo-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
