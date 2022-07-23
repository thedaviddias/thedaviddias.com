import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { NextLink } from '@/components/next-link'

import { FOOTER_MENU_LINKS, SOCIAL_LINKS } from '@/constants'

export const Footer = () => {
  const { t } = useTranslation('common')
  const { resolvedTheme, setTheme } = useTheme()
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
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8 print:hidden">
            <div className="space-y-8 xl:col-span-1">
              <span>The David Dias</span>
              <p className="text-gray-500 text-sm">
                I like solving digital and human problems! I spend most of my time coding using
                modern HTML, CSS, and Javascript. Outside of work, I enjoy meeting new people,
                building communities and producing multimedia content.
              </p>
              <div className="flex space-x-6"></div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {t('footer.general')}
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {FOOTER_MENU_LINKS(t).map(({ path, label }) => (
                      <li key={path}>
                        <NextLink href={path} passHref>
                          {label}
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {t('footer.social')}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {SOCIAL_LINKS.map(({ label, link }) => (
                      <li key={link}>
                        <NextLink href={link} passHref>
                          <a>{label}</a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} David Dias</p>

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
      </footer>
    </div>
  )
}
