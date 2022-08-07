import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SkipLinks } from '@/components/SkipLinks'

import { extendSEO } from '@/config/seo'

type ContainerProps = {
  children: React.ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
  const router = useRouter()
  const { t, lang } = useTranslation('common')

  return (
    <div className="min-h-screen flex flex-col">
      <NextSeo {...extendSEO({ locale: lang, translate: t })} />
      <SkipLinks />
      <Header pathname={router.pathname} />
      <div className="py-3 top-0 mb-12">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
