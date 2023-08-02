import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'

import FrFlag from '../../../public/images/svg/fr-flag.svg'
import UsFlag from '../../../public/images/svg/us-flag.svg'

import i18nConfig from '~/i18n.json'

const { locales } = i18nConfig

type ChangeLanguageProps = {
  hasTranslation?: boolean
}

export const ChangeLanguage: FC<ChangeLanguageProps> = ({ hasTranslation = true }) => {
  const { t, lang } = useTranslation('common')
  const router = useRouter()

  const langSwitch = locales.map((lng: string) => {
    if (lng === lang) return null

    const switchLabel =
      lng === 'en'
        ? t(`layout.language.${lng}.switch`, { lang: t(`layout.language.${lng}.fullName`) })
        : t(`layout.language.${lng}.switch`, { lang: t(`layout.language.${lng}.fullName`) })

    let redirectPath = router.asPath
    if (
      (router.asPath.includes('/articles/') ||
        router.asPath.includes('/notes/') ||
        router.asPath.includes('/categories/') ||
        router.asPath.includes('/tags/')) &&
      !['/articles', '/notes'].includes(router.asPath)
    ) {
      redirectPath = '/'
    }

    return (
      <CustomLink
        key={lng}
        aria-label={switchLabel}
        className="w-7 h-7 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300  transition-all"
        href={hasTranslation ? redirectPath : '/'}
        locale={lng}
      >
        {lng === 'en' ? (
          <UsFlag className="w-7 h-7 rounded-lg" aria-hidden />
        ) : (
          <FrFlag className="w-7 h-7 rounded-lg" aria-hidden />
        )}
      </CustomLink>
    )
  })

  return <>{langSwitch}</>
}
