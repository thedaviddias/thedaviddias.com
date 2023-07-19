type InlineCodeProps = {
  children: React.ReactNode
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="before:!content-[''] after:!content-[''] dark:text-white bg-slate-100 dark:bg-slate-700 rounded-sm border-[1px] border-gray-400 dark:border-gray-400 px-1 py-0.5">
      {children}
    </code>
  )
}
