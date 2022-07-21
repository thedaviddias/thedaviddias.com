import Link from 'next/link'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { MENU_LINKS } from '@/constants'

export const Header = () => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)
  const [mobileMenuState, setMobileMenuState] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header className="flex-grow-0 flex-shrink-0 bg-opacity-[0.96] dark:text-gray-200 z-30 bg-white dark:bg-gray-900 transition-colors duration-200 py-3 sticky top-0 mb-12">
      <div className="max-w-[60rem] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="flex-1 flex items-center sm:justify-start align-middle">
            <Link href="/" passHref>
              <span className="font-extrabold text-base xs:text-lg sm:!text-xl sm:mt-[-3px] sm:mr-6">
                The David Dias
              </span>
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {MENU_LINKS(t).map(({ path, label }) => (
                <Link
                  href={path}
                  passHref
                  key={label}
                  className="mr-6 hover:text-black dark:hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="w-8 h-8 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300  transition-all"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-800 dark:text-gray-200"
                >
                  {resolvedTheme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              )}
            </button>
            <div className="block sm:hidden">
              <nav>
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
                    <div className="text-center mt-6 inset-y-1/2 flex-grow">
                      <div className="mt-12">
                        {MENU_LINKS(t).map(({ path, label }) => (
                          <Link
                            href={path}
                            passHref
                            key={label}
                            className="block mt-2 mb-5 title text-black dark:text-white"
                          >
                            <div>{label}</div>
                          </Link>
                        ))}
                      </div>
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
