import { LinkProps } from 'next/link'
import { FC } from 'react'

type CustomLinkProps = LinkProps & {
  href: string
  children: React.ReactNode
}

export const CustomLink: FC<CustomLinkProps> = ({ href, children }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" className="text-indigo-200">
        {children}
      </a>
    )
  }
  return (
    <CustomLink href={href} passHref>
      {children}
    </CustomLink>
  )
}
