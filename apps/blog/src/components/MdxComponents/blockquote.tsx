type BlockquoteProps = {
  children: React.ReactNode
}

export const Blockquote: React.FC<BlockquoteProps> = ({ children }) => (
  <blockquote>{children}</blockquote>
)
