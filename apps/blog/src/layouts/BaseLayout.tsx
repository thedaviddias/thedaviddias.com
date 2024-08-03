import { NextSeo, NextSeoProps } from 'next-seo'

import { Container } from '@/components/Container'

import { SEOProps } from '@/config/seo'
import { PropsWithChildren, ReactNode } from 'react'

type BaseLayoutProps = {
  title: string
  description: string
  openGraph?: SEOProps
  className?: string
  languageAlternates?: {
    hrefLang: string
    href: string
  }[]
  noindex?: boolean
  nofollow?: boolean
}

export const BaseLayout = ({
  children,
  title,
  description,
  openGraph,
  className,
  languageAlternates,
  noindex,
  nofollow,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        openGraph={openGraph}
        languageAlternates={languageAlternates}
        noindex={noindex}
        nofollow={nofollow}
      />
      <main className={className} id="main" data-skip-link="main content">
        {children}
      </main>
    </Container>
  )
}
