import NextLink from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <div className="flex-grow-0 flex-shrink-0">
      <footer className="main-footer bg-gray-50 dark:bg-gray-850 mt-6 sm:mt-10 transform">
        <div>
          {t('footer.general')}
          {FOOTER_MENU_LINKS(t).map(({ path, label }) => (
            <NextLink key={path} href={path} passHref>
              <a>{label}</a>
            </NextLink>
          ))}
        </div>
        {/* <div>
          {t('footer.extra')}
          {EXTRA_LINKS(t).map(({ path, label }) => (
            <NextLink key={path} href={path} passHref>
              <a>{label}</a>
            </NextLink>
          ))}
        </div> */}
        <div>
          {t('footer.social')}
          {SOCIAL_LINKS.map(({ label, link }) => (
            <NextLink key={link} href={link} passHref>
              <a>{label}</a>
            </NextLink>
          ))}
        </div>
      </footer>
      <div>© {new Date().getFullYear()} David Dias</div>
    </div>
  )
}
