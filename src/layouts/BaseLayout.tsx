import clsx from 'clsx'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import React, { FC } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SkipLinks } from '@/components/SkipLinks'

type BaseLayoutProps = NextSeoProps & {
  children: React.ReactNode
  className?: string
  skipLink?: string
}

export const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  className,
  skipLink = 'main content',
  ...props
}) => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <NextSeo {...props} />
      <SkipLinks />
      <Header pathname={router.pathname} />
      <div className="py-3 top-0 mb-12">
        <main
          className={clsx('pt-10 border-none max-w-5xl mx-auto px-2 sm:px-6 lg:px-8', className)}
          id="main"
          data-skip-link={skipLink}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
