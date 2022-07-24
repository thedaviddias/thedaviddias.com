import * as React from 'react'

type ParagraphProps = {
  className?: string
  prose?: boolean
  as?: React.ElementType
} & ({ children: React.ReactNode } | { dangerouslySetInnerHTML: { __html: string } })

export const Paragraph = ({ className, prose = true, as = 'p', ...rest }: ParagraphProps) => {
  return React.createElement(as, {
    className: `${
      prose && 'prose'
    } max-w-full text-lg my-3 leading-relaxed ${className} ${className}`,
    ...rest,
  })
}
