type InlineCodeProps = {
  children: React.ReactNode
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="rounded-sm border-[1px] border-gray-400 bg-slate-100 px-1 py-0.5 before:!content-[''] after:!content-[''] dark:border-gray-400 dark:bg-slate-700 dark:text-white">
      {children}
    </code>
  )
}
