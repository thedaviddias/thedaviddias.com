type InlineCodeProps = {
  children: React.ReactNode
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return <code className="dark:text-white dark:bg-slate-700">{children}</code>
}
