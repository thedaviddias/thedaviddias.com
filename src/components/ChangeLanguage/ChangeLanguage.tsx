import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'

import FrFlag from '../../../public/images/svg/fr-flag.svg'
import UsFlag from '../../../public/images/svg/us-flag.svg'

import i18nConfig from '~/i18n.json'

const { locales } = i18nConfig

export const ChangeLanguage = () => {
  const { t, lang } = useTranslation('common')

  const langSwitch = locales.map((lng: string) => {
    if (lng === lang) return null

    const switchLabel =
      lng === 'en'
        ? t(`layout.language.${lng}.switch`, { lang: t(`layout.language.${lng}.fullName`) })
        : t(`layout.language.${lng}.switch`, { lang: t(`layout.language.${lng}.fullName`) })

    return (
      <CustomLink
        key={lng}
        aria-label={switchLabel}
        className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300  transition-all"
        href="/"
        locale={lng}
      >
        {lng === 'en' ? (
          <UsFlag className="w-8 h-8 rounded-lg" aria-hidden />
        ) : (
          <FrFlag className="w-8 h-8 rounded-lg" aria-hidden />
        )}
      </CustomLink>
    )
  })

  return <>{langSwitch}</>
}
