import Link from 'next/link'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { MENU_LINKS } from '@/constants'

export const Header = () => {
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header>
      <div className="max-w-[60rem] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link className="sm:mr-6" href="/">
              <span className="font-extrabold tracking-tight serif:tracking-normal text-base xs:text-lg sm:!text-xl leading-none inline-block sm:mt-[-3px]">
                thedaviddias<span className="hidden xs:inline">.dev</span>
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

              <div className="block sm:hidden">
                <nav role="navigation">
                  <div className="float-right h-1">
                    <span className=" ml-1 -mt-3 relative p-0.5 -top-0.5 -right-0.5 inline-block">
                      <button
                        aria-expanded="false"
                        aria-controls="mobile-menu"
                        className="p-3 rounded focus:ring focus:outline-none transition-colors bg-white dark:bg-gray-900 focus:ring-gray-500 dark:hover:bg-gray-700 hover:bg-gray-200 "
                      >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <div className="mobile-header hidden origin-top-right flex flex-col fixed w-full h-full inset-0 top-[81px] bg-white dark:bg-gray-900 py-6 wrapper padding backdrop-filter backdrop-blur-sm bg-opacity-[0.96] dark:bg-opacity-80 transition-colors duration-200">
                    <div className="w-[300%] absolute h-[200%] top-0 right-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>
                    <div className="w-full absolute h-[300%] top-full left-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>
                    <div id="mobile-menu">
                      <div className="text-center mt-6 inset-y-1/2 flex-grow">
                        <div className="mt-12">
                          <Link
                            className="block mt-2 mb-5 title text-black dark:text-white"
                            href="/"
                          >
                            <div>Home</div>
                          </Link>
                          <Link
                            className="block mt-2 mb-5 title text-black dark:text-white"
                            href="/articles"
                          >
                            <div>Articles</div>
                          </Link>
                          <Link
                            className="block mt-2 mb-5 title text-black dark:text-white"
                            href="/notes"
                          >
                            <div>Notes</div>
                          </Link>
                          <Link
                            className="block mt-2 mb-5 title text-black dark:text-white"
                            href="/about"
                          >
                            <div>About</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
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
          </div>
        </div>
      </div>
    </header>
  )
}
