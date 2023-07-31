import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'

import { MENU_LINKS } from '@/constants'

import { BannerLang } from '../BannerLang'
import { ChangeLanguage } from '../ChangeLanguage'
import { ThemeSwitch } from '../ThemeSwitch'

type HeaderProps = {
  pathname: string
}

export const Header: React.FC<HeaderProps> = ({ pathname }) => {
  const { t } = useTranslation('common')
  const [userLocale, setUserLocale] = useState('')
  const router = useRouter()

  const isHomepage = router.asPath === '/'

  useEffect(() => {
    const userLocale =
      navigator.languages && navigator.languages.length
        ? window.navigator.languages[0]
        : window.navigator.language

    setUserLocale(userLocale)
  }, [])

  const [mobileMenuState, setMobileMenuState] = useState(false)

  return (
    <header className="dark:text-gray-100 transition-colors duration-200 ">
      {userLocale === ('fr' || 'fr-FR' || 'fr-CA') ? <BannerLang /> : null}
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-3 top-0 lg:mb-12">
        <div className="relative flex justify-between h-16">
          <div className="flex-1 flex items-center sm:justify-between align-middle">
            {isHomepage ? (
              <span className="font-bold text-2xl lg:text-xl sm:mt-[-3px] sm:mr-6 !no-underline">
                {t('title')}
              </span>
            ) : (
              <CustomLink
                href="/"
                className="font-bold text-2xl lg:text-xl sm:mt-[-3px] sm:mr-6 !no-underline cursor-auto"
                data-testid="thedaviddias-logo"
                data-analytics='"Homepage logo"'
              >
                {t('title')}
              </CustomLink>
            )}
            <div className="hidden sm:flex sm:gap-x-5" data-testid="desktop-menu">
              <nav aria-label="Main navigation" className="flex gap-x-4">
                {MENU_LINKS(t)
                  .filter((item) => item.menu !== false)
                  .map((item) => (
                    <CustomLink
                      href={item.path}
                      key={item.label}
                      aria-current={pathname === item.path ? 'page' : undefined}
                      className={
                        pathname === item.path
                          ? 'font-bold underline p-2'
                          : 'hover:text-black hover:underline dark:hover:text-white p-2'
                      }
                    >
                      {item.label}
                    </CustomLink>
                  ))}
              </nav>
              <div className="flex item space-x-4">
                <ChangeLanguage />
                <ThemeSwitch />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0 print:hidden">
            <div className="block sm:hidden">
              <nav data-testid="mobile-menu">
                <button
                  aria-label="Toggle menu"
                  aria-expanded="false"
                  aria-controls="mobile-menu"
                  type="button"
                  className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300  transition-all"
                  onClick={() => setMobileMenuState(!mobileMenuState)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-800 dark:text-gray-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  className={`mobile-header origin-top-right flex flex-col fixed w-full h-full inset-0 top-[81px] bg-white dark:bg-gray-900 py-6 wrapper padding backdrop-filter backdrop-blur-sm bg-opacity-[0.96] dark:bg-opacity-80 transition-colors duration-200 ${
                    mobileMenuState ? '' : 'hidden'
                  }`}
                >
                  <div className="w-[300%] absolute h-[200%] top-0 right-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>
                  <div className="w-full absolute h-[300%] top-full left-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>
                  <div id="mobile-menu">
                    <nav className="text-center mt-6 inset-y-1/2 flex-grow">
                      <ul className="mt-12">
                        {MENU_LINKS(t).map(({ path, label }) => (
                          <li key={label}>
                            <CustomLink
                              href={path}
                              className="block mt-2 mb-5 title text-black dark:text-white"
                            >
                              <div
                                className={pathname === path ? 'text-2xl font-bold' : 'text-2xl'}
                              >
                                {label}
                              </div>
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="flex item space-x-4 justify-center">
                      <ChangeLanguage />
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
