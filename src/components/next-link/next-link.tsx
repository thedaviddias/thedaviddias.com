import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

type NextLinkProps = LinkProps & {
  href: string
  className?: string
}

export const NextLink: FC<NextLinkProps> = ({ href, className, children, ...rest }) => (
  <Link href={href} {...rest}>
    <a href={href} className={className}>
      {children}
    </a>
  </Link>
)
