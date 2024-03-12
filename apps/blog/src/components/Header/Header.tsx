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
    <header className="transition-colors duration-200 dark:text-gray-100 ">
      {userLocale === ('fr' || 'fr-FR' || 'fr-CA') ? <BannerLang /> : null}
      <div className="top-0 mx-auto max-w-5xl px-2 py-3 sm:px-6 lg:mb-12 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center align-middle sm:justify-between">
            {isHomepage ? (
              <span className="text-2xl font-bold !no-underline sm:mr-6 sm:mt-[-3px]">
                {t('title')}
              </span>
            ) : (
              <CustomLink
                href="/"
                className="cursor-auto text-2xl font-bold !no-underline sm:mr-6 sm:mt-[-3px]"
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
                          ? 'p-2 font-bold underline'
                          : 'p-2 text-lg hover:text-black hover:underline dark:hover:text-white'
                      }
                    >
                      {item.label}
                    </CustomLink>
                  ))}
              </nav>
              <div className="flex items-center justify-center space-x-4">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2  dark:bg-gray-600"
                  onClick={() => setMobileMenuState(!mobileMenuState)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-800 dark:text-gray-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  className={`mobile-header wrapper padding fixed inset-0 top-[81px] flex h-full w-full origin-top-right flex-col bg-white bg-opacity-[0.96] py-6 backdrop-blur-sm backdrop-filter transition-colors duration-200 dark:bg-gray-900 dark:bg-opacity-80 ${
                    mobileMenuState ? '' : 'hidden'
                  }`}
                >
                  <div className="absolute right-full top-0 h-[200%] w-[300%] bg-white bg-opacity-90 backdrop-blur-sm backdrop-filter dark:bg-gray-900 dark:bg-opacity-80"></div>
                  <div className="absolute left-0 top-full h-[300%] w-full bg-white bg-opacity-90 backdrop-blur-sm backdrop-filter dark:bg-gray-900 dark:bg-opacity-80"></div>
                  <div id="mobile-menu">
                    <nav className="inset-y-1/2 mt-6 flex-grow text-center">
                      <ul className="mt-12">
                        {MENU_LINKS(t).map(({ path, label }) => (
                          <li key={label}>
                            <CustomLink
                              href={path}
                              className="title mb-5 mt-2 block text-black dark:text-white"
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
                    <div className="item flex justify-center space-x-4">
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
