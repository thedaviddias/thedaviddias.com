import NextLink from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <div className="flex-grow-0 flex-shrink-0">
      <footer
        className="main-footer bg-gray-50 dark:bg-gray-850 mt-6 sm:mt-10 transform"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              The David Dias
              <p className="text-gray-500 text-base">....</p>
              <div className="flex space-x-6"></div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {t('footer.general')}
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {FOOTER_MENU_LINKS(t).map(({ path, label }) => (
                      <li key={path}>
                        <NextLink href={path} passHref>
                          <a>{label}</a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {t('footer.social')}
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {SOCIAL_LINKS.map(({ label, link }) => (
                      <li key={link}>
                        <NextLink href={link} passHref>
                          <a>{label}</a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} David Dias</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
