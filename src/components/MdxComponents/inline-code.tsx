import { FC } from 'react'

type InlineCodeProps = {
  children: React.ReactNode
}

export const InlineCode: FC<InlineCodeProps> = ({ children }) => {
  return <code>{children}</code>
}
