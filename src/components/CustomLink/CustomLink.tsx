import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

type CustomLinkProps = LinkProps & {
  href: string
  className?: string
  children: React.ReactNode
}

export const CustomLink: FC<CustomLinkProps> = ({ href, className, children, ...rest }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  if (!isInternalLink) {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={`inline-flex hover:underline dark:text-indigo-400 ${className}`}
      >
        {children}
        <span className="inline-flex items-center">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            className="chakra-icon css-13otjrl"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </a>
    )
  }

  return (
    <Link href={href} {...rest}>
      <a href={href} className={`hover:underline ${className}`}>
        {children}
      </a>
    </Link>
  )
}
