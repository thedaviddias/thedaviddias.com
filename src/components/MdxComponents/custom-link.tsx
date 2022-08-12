import { LinkProps } from 'next/link'

type CustomLinkProps = LinkProps & {
  href: string
  children: React.ReactNode
}

export const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <span className="not-prose">
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-500 hover:no-underline transition-colors duration-200"
        >
          {children}
        </a>
      </span>
    )
  }
  return <CustomLink href={href}>{children}</CustomLink>
}
