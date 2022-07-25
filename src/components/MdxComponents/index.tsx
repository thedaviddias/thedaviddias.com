import { H1, H2, H3, H4 } from '@/components/Heading'

import { Blockquote } from './blockquote'
import { CustomLink } from './custom-link'
import { InlineCode } from './inline-code'
import { Pre } from './pre'
import { ResponsiveImage } from './responsive-image'
import { Tweet } from './tweet'
import { Paragraph } from '../Paragraph'

export const MDXComponents = {
  // hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  a: CustomLink,
  blockquote: Blockquote,
  h1: (props) => <H1 as="h1" {...props} />,
  h2: (props) => <H2 as="h2" {...props} />,
  h3: (props) => <H3 as="h3" {...props} />,
  h4: (props) => <H4 as="h4" {...props} />,
  img: ResponsiveImage,
  inlineCode: InlineCode,
  li: (props) => <li {...props} className="nested-list text-lg" />,
  ol: (props) => <ol {...props} className="list-decimal text-lg" />,
  p: Paragraph,
  pre: Pre,
  Tweet,
  ul: (props) => <ul {...props} className="list-disc" />,
}
