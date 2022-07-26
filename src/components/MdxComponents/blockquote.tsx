import { FC } from 'react'

type BlockquoteProps = {
  children: React.ReactNode
}

export const Blockquote: FC<BlockquoteProps> = ({ children }) => <blockquote>{children}</blockquote>
