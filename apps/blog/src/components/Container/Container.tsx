import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { useReadingProgress } from '@/hooks/useReadingProgress'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SkipLinks } from '@/components/SkipLinks'

import { extendSEO } from '@/config/seo'

type ContainerProps = {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const router = useRouter()
  const { t, lang } = useTranslation('common')
  const completion = useReadingProgress()

  const isPost = router.pathname.includes('/articles/') || router.pathname.includes('/notes/')

  return (
    <>
      <div className="flex min-h-screen flex-col">
        {isPost ? (
          <div className="sticky top-0 z-50 py-1 backdrop-blur-3xl" aria-hidden>
            <span
              id="progress-bar"
              style={{
                transform: `translateX(${completion - 100}%)`,
              }}
              className={`absolute bottom-0 h-1 w-full bg-slate-900 transition-transform duration-150 dark:bg-blue-400`}
            />
          </div>
        ) : null}
        <NextSeo {...extendSEO({ locale: lang, translate: t })} />
        <SkipLinks />

        <Header pathname={router.pathname} />
        <div className="top-0 mb-12 py-3">
          <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}
