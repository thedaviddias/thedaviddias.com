import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { MENU_LINKS } from '@/constants'

import { NextLink } from '../next-link'

export const Header = ({ pathname }) => {
  const { t } = useTranslation('common')

  const [mobileMenuState, setMobileMenuState] = useState(false)

  return (
    <header className="flex-grow-0 flex-shrink-0 bg-opacity-[0.96] dark:text-gray-200 z-30 bg-white dark:bg-gray-900 transition-colors duration-200 py-3 top-0 mb-12">
      <div className="max-w-[60rem] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="flex-1 flex items-center sm:justify-between align-middle">
            <NextLink
              href="/"
              passHref
              className="font-extrabold text-base xs:text-lg sm:!text-xl sm:mt-[-3px] sm:mr-6"
            >
              The David Dias
            </NextLink>
            <nav className="hidden sm:flex">
              {MENU_LINKS(t).map((item) => (
                <NextLink
                  href={item.path}
                  passHref
                  key={item.label}
                  aria-current={pathname === item.path ? 'page' : undefined}
                  className={
                    pathname === item.path
                      ? 'mr-10 font-bold'
                      : 'mr-10 hover:text-black hover:underline dark:hover:text-white'
                  }
                >
                  {item.label}
                </NextLink>
              ))}
            </nav>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
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
                          <NextLink
                            href={path}
                            passHref
                            key={label}
                            className="block mt-2 mb-5 title text-black dark:text-white"
                          >
                            <div>{label}</div>
                          </NextLink>
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
