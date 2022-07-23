import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

type CustomLinkProps = LinkProps & {
  href: string
  className?: string
}

export const CustomLink: FC<CustomLinkProps> = ({ href, className, children, ...rest }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...rest}>
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  )
}
