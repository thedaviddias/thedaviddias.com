import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { MENU_LINKS } from '@/constants'

export const Header = () => {
  const { t } = useTranslation('common')
  return (
    <header className="flex-grow-0 flex-shrink-0 main-header bg-opacity-[0.96] dark:text-gray-200 z-30 bg-white dark:bg-gray-900 transition-colors duration-200 py-6 w-full mx-auto sticky top-0 mb-12">
      <div className="wrapper padding !w-full !max-w-full">
        <div className="inline-block">
          <Link className="sm:mr-6" href="/">
            <span className="font-extrabold tracking-tight serif:tracking-normal text-base xs:text-lg sm:!text-xl leading-none inline-block sm:mt-[-3px]">
              thedaviddias<span className="hidden xs:inline">.dev</span>
            </span>
          </Link>
        </div>
        <nav className="inline-block float-right sm:float-none">
          <div className="hidden sm:block">
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
          </div>
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
                      <Link className="block mt-2 mb-5 title text-black dark:text-white" href="/">
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
    </header>
  )
}
