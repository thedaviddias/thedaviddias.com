import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'
import { ThemeSwitch } from '@/components/ThemeSwitch'

import { FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

export const Footer = () => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="mt-auto">
      <footer
        className="main-footer bg-gray-50 dark:bg-black mt-5 sm:mt-8 transform"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          {t('footer.name')}
        </h2>
        <div className="max-w-5xl px-2 mx-auto py-12 sm:px-6 lg:py-7 lg:px-8">
          <div className="flex flex-col-reverse sm:flex-row print:hidden">
            <div className="w-full sm:w-1/2 lg:w-[40%] text-center sm:text-left flex-grow sm:mb-0 pr-24">
              <span className="mb-5 block">{t('title')}</span>
              <p className="text-gray-500 text-sm">{t('hero.presentation')}</p>
              <div className="flex space-x-6"></div>
            </div>

            <div className="w-full sm:w-1/2 lg:w-[60%] !max-w-full flex-shrink-0 flex-grow flex justify-between text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="small-title">{t('footer.general')}</h3>

                <ul className="mt-3 space-y-3">
                  {FOOTER_MENU_LINKS(t).map(({ path, label }) => (
                    <li key={path}>
                      <CustomLink href={path} passHref>
                        {label}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
              <div>
                <h3 className="small-title">{t('footer.social')}</h3>
                <ul className="mt-3 space-y-3">
                  {SOCIAL_LINKS.map(({ label, link }) => (
                    <li key={link}>
                      <CustomLink href={link} passHref>
                        {label}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} David Dias</p>
            <ThemeSwitch />
          </div>
        </div>
      </footer>
    </div>
  )
}
