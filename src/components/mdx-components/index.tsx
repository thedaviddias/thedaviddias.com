import { H1, H2, H3, H4 } from '@/components/heading'

import { Blockquote } from './blockquote'
import { CodeHighlight } from './code-highlight'
import { CustomLink } from './custom-link'
import { InlineCode } from './inline-code'
import { ResponsiveImage } from './responsive-image'
import { Tweet } from './tweet'
import { Paragraph } from '../paragraph'

export const MDXComponents = {
  // hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  a: CustomLink,
  blockquote: Blockquote,
  code: CodeHighlight,
  h1: (props) => <H1 as="h1" {...props} />,
  h2: (props) => <H2 as="h2" {...props} />,
  h3: (props) => <H3 as="h3" {...props} />,
  h4: (props) => <H4 as="h4" {...props} />,
  img: ResponsiveImage,
  inlineCode: InlineCode,
  li: (props) => <li {...props} className="nested-list" />,
  ol: (props) => <ol {...props} className="list-decimal" />,
  p: Paragraph,
  // pre: ({ children }) => children,
  Tweet,
  ul: (props) => <ul {...props} className="list-disc" />,
}
