import Link from 'next/link'

export const CustomLink = ({ href, children }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <a href={href} className="text-primary-500" rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} passHref>
      <a className="text-primary-500">{children}</a>
    </Link>
  )
}
