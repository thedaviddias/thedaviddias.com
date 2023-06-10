import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'

import { EXTRA_LINKS, FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

const FooterMenuLinks = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <h3 className="small-title">{t('layout.footer.general')}</h3>
      <ul className="mt-3 space-y-3">
        {FOOTER_MENU_LINKS(t).map(({ path, label }) => (
          <li key={label}>
            <CustomLink href={path} className="dark:!text-white">
              {label}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterExtraLinks = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <h3 className="small-title">{t('layout.footer.extra')}</h3>
      <ul className="mt-3 space-y-3">
        {EXTRA_LINKS(t).map(({ path, label }) => (
          <li key={label}>
            <CustomLink href={path} className="dark:!text-white">
              {label}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterSocialLinks = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <h3 className="small-title">{t('layout.footer.social')}</h3>
      <ul className="mt-3 space-y-3">
        {SOCIAL_LINKS.map(({ label, link }) => (
          <li key={label}>
            <CustomLink href={link} className="dark:!text-white">
              {label}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
          {t('layout.footer.name')}
        </h2>
        <div className="max-w-5xl px-2 mx-auto py-12 sm:px-6 lg:py-7 lg:px-8">
          <div className="flex flex-col-reverse sm:flex-row print:hidden">
            <div className="w-full sm:w-1/2 lg:w-[40%] text-left flex-grow sm:mb-0 md:pr-24 mt-10 sm:mt-10">
              <span className="mb-5 block">{t('title')}</span>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {t('home.hero.presentation')}
              </p>
              <div className="flex space-x-6"></div>
            </div>

            <div className="sm:w-1/2 lg:w-[60%] !max-w-full w-full flex-shrink-0 flex-grow flex justify-between text-gray-500 dark:text-gray-400">
              <FooterMenuLinks />
              <FooterExtraLinks />
              <FooterSocialLinks />
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-400 pt-3 flex items-center justify-between">
            <p className="text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} David Dias
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
