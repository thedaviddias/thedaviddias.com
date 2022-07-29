import React, { FC } from 'react'

type StrongProps = {
  children: React.ReactNode
}

export const Strong: FC<StrongProps> = ({ children }) => {
  return <strong className="dark:text-white">{children}</strong>
}
