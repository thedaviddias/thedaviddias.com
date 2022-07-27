import { NextSeo } from 'next-seo'
import React, { FC } from 'react'

import { Container } from '@/components/Container'

import { SEOProps } from '@/config/seo'

type BaseLayoutProps = {
  children: React.ReactNode
  title: string
  description: string
  openGraph?: SEOProps
  className?: string
}

export const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  title,
  description,
  openGraph,
  className,
}) => {
  return (
    <Container>
      <NextSeo title={title} description={description} openGraph={openGraph} />
      <main className={className}>{children}</main>
    </Container>
  )
}
