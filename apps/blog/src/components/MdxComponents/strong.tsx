type StrongProps = {
  children: React.ReactNode
}

export const Strong: React.FC<StrongProps> = ({ children }) => {
  return <strong className="dark:text-white">{children}</strong>
}
