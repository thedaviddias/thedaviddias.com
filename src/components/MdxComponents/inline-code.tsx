import { FC } from 'react'

type InlineCodeProps = {
  children: React.ReactNode
}

export const InlineCode: FC<InlineCodeProps> = ({ children }) => {
  return <code className="dark:text-white dark:bg-slate-700">{children}</code>
}
