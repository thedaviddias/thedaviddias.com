import { clsx } from 'clsx'
import * as React from 'react'

type ParagraphProps = {
  className?: string
  prose?: boolean
  textColorClassName?: string
  as?: React.ElementType
} & ({ children: React.ReactNode } | { dangerouslySetInnerHTML: { __html: string } })

export const Paragraph = ({
  className,
  prose = true,
  as = 'p',
  textColorClassName = 'text-secondary',
  ...rest
}: ParagraphProps) => {
  return React.createElement(as, {
    className: clsx('max-w-full text-lg', textColorClassName, className, {
      'prose prose-light dark:prose-dark': prose,
    }),
    ...rest,
  })
}
