import {
  ClassAttributes,
  ElementType,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
} from 'react'

import { H1, H2, H3, H4 } from '@/components/Headings'
import { Paragraph } from '@/components/ParagraphPost'

import { Blockquote } from './blockquote'
import { CustomLink } from './custom-link'
import { InlineCode } from './inline-code'
import { Pre } from './pre'
import { ResponsiveImage } from './responsive-image'
import { Tweet } from './tweet'

export const MDXComponents: any = {
  hr: (
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHRElement> & HTMLAttributes<HTMLHRElement>
  ) => <hr {...props} />,
  a: CustomLink,
  blockquote: Blockquote,
  h1: (
    props: JSX.IntrinsicAttributes &
      ({
        variant?: 'primary' | 'secondary' | undefined
        as?: ElementType<any> | undefined
        className?: string | undefined
        id?: string | undefined
      } & ({ children: ReactNode } | { dangerouslySetInnerHTML: { __html: string } }))
  ) => <H1 as="h1" {...props} />,
  h2: (
    props: JSX.IntrinsicAttributes &
      ({
        variant?: 'primary' | 'secondary' | undefined
        as?: ElementType<any> | undefined
        className?: string | undefined
        id?: string | undefined
      } & ({ children: ReactNode } | { dangerouslySetInnerHTML: { __html: string } }))
  ) => <H2 as="h2" {...props} />,
  h3: (
    props: JSX.IntrinsicAttributes &
      ({
        variant?: 'primary' | 'secondary' | undefined
        as?: ElementType<any> | undefined
        className?: string | undefined
        id?: string | undefined
      } & ({ children: ReactNode } | { dangerouslySetInnerHTML: { __html: string } }))
  ) => <H3 as="h3" {...props} />,
  h4: (
    props: JSX.IntrinsicAttributes &
      ({
        variant?: 'primary' | 'secondary' | undefined
        as?: ElementType<any> | undefined
        className?: string | undefined
        id?: string | undefined
      } & ({ children: ReactNode } | { dangerouslySetInnerHTML: { __html: string } }))
  ) => <H4 as="h4" {...props} />,
  img: ResponsiveImage,
  inlineCode: InlineCode,
  li: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLLIElement> &
      LiHTMLAttributes<HTMLLIElement>
  ) => <li {...props} className="nested-list text-lg" />,
  ol: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLOListElement> &
      OlHTMLAttributes<HTMLOListElement>
  ) => <ol {...props} className="list-decimal text-lg" />,
  p: Paragraph,
  pre: Pre,
  Tweet,
  ul: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLUListElement> &
      HTMLAttributes<HTMLUListElement>
  ) => <ul {...props} className="list-disc" />,
}
