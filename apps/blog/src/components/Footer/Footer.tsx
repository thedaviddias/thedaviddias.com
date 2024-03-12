import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'
import NewsletterForm from '@/components/NewsletterForm/NewsletterForm'

import { EXTRA_LINKS, FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

const FooterMenuLinks = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <h3 className="small-title">{t('layout.footer.general')}</h3>
      <ul className="mt-3 space-y-1">
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
      <ul className="mt-3 space-y-1">
        {EXTRA_LINKS(t).map(({ path, label, locale }) => (
          <li key={label}>
            <CustomLink href={path} className="dark:!text-white" locale={locale}>
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
      <ul className="mt-3 space-y-1">
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
    <footer className="mt-auto pt-5 sm:pt-8">
      <div className="relative mx-auto h-36 max-w-5xl">
        <Image
          className="mx-auto max-w-xl object-cover"
          src="/images/david-dias-banner.png"
          alt="David mecanic mode, David designer mode, David gaming mode, David sailing mode, David VR mode"
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <NewsletterForm />
      </div>
      <div
        className="main-footer transform bg-gray-50 dark:bg-black"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          {t('layout.footer.name')}
        </h2>
        <div className="mx-auto max-w-5xl px-2 py-12 sm:px-6 lg:px-8 lg:py-7">
          <div className="flex flex-col-reverse sm:flex-row print:hidden">
            <div className="mt-10 w-full flex-grow text-left sm:mb-0 sm:mt-10 sm:w-1/2 md:pr-24 lg:w-[40%]">
              <span className="mb-5 block">{t('title')}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('home.hero.presentation')}
              </p>
              <div className="flex space-x-6"></div>
            </div>

            <div className="flex w-full !max-w-full flex-shrink-0 flex-grow justify-between text-gray-500 sm:w-1/2 lg:w-[60%] dark:text-gray-400">
              <FooterMenuLinks />
              <FooterExtraLinks />
              <FooterSocialLinks />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-400">
            <p className="text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} David Dias
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
