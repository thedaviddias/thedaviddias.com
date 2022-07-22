import dynamic from 'next/dynamic'
import Image from 'next/image'
import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import { TwitterEmbed } from 'react-social-media-embed'
import slugify from 'slugify'

import { H1, H2, H3, H4 } from '@/components/heading'

import { Paragraph } from '../paragraph'

// const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />

// const CodeHighlight = ({ children: codeString, className: language }: any) => {
//   language = language.replace('language-', '')
//   const theme = useColorModeValue(lightTheme, darkTheme)
//   const lineNumberColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500')
//   const preBackground = useColorModeValue('gray.50', 'gray.900')

//   return (
//     <ChakraHighlight {...defaultProps} code={codeString} language={language} theme={theme}>
//       {({ className, style, tokens, getLineProps, getTokenProps }) => {
//         tokens.pop()
//         return (
//           <div data-language={className}>
//             <chakra.pre
//               className={className}
//               sx={{ ...style, backgroundColor: preBackground }}
//               overflowX="auto"
//               rounded="md"
//               p={4}
//               mx={-4}
//             >
//               {tokens.map((line, i) => {
//                 const lineProps = getLineProps({ line, key: i })
//                 return (
//                   <chakra.div {...lineProps} display="table-row" key={i}>
//                     <chakra.span
//                       w={8}
//                       display="table-cell"
//                       textAlign="right"
//                       userSelect="none"
//                       color={lineNumberColor}
//                       pr={3}
//                     >
//                       {i + 1}
//                     </chakra.span>
//                     {line.map((token, key) => {
//                       return <chakra.span {...getTokenProps({ token, key })} key={key} />
//                     })}
//                   </chakra.div>
//                 )
//               })}
//             </chakra.pre>
//           </div>
//         )
//       }}
//     </ChakraHighlight>
//   )
// }

// const InlineCode = (props: any) => (
//   <chakra.code apply="mdx.code" color={useColorModeValue('purple.500', 'purple.200')} {...props} />
// )

// const LinkedHeading = (props: HTMLChakraProps<'h2'>) => {
//   const slug = slugify(props.children as string, { lower: true })
//   return (
//     <Link href={`#${slug}`} name={slug} role="group">
//       <Box
//         {...props}
//         display="inline"
//         fontFamily="heading"
//         color={useColorModeValue('gray.700', 'yellow.400')}
//       >
//         {props.children}
//       </Box>
//       <chakra.span
//         aria-label="anchor"
//         color="teal.500"
//         userSelect="none"
//         fontWeight="normal"
//         outline="none"
//         _focus={{ opacity: 1, boxShadow: 'outline' }}
//         opacity={0}
//         _groupHover={{ opacity: 1 }}
//         ml="0.375rem"
//       >
//         #
//       </chakra.span>
//     </Link>
//   )
// }

// const CustomHeading = ({ as, id, ...props }) => {
//   if (id) {
//     return (
//       <Link href={`#${id}`}>
//         <NextLink href={`#${id}`}>
//           <Heading
//             as={as}
//             display="inline"
//             id={id}
//             lineHeight={'1em'}
//             {...props}
//             _hover={{
//               _before: {
//                 content: '"#"',
//                 position: 'relative',
//                 marginLeft: '-1.2ch',
//                 paddingRight: '0.2ch',
//               },
//             }}
//           />
//         </NextLink>
//       </Link>
//     );
//   }
//   return <Heading as={as} {...props} />;
// };

const ResponsiveImage = (props) => <img alt={props.alt} layout="responsive" {...props} />

export const MDXComponents = {
  // code: CodeHighlight,
  // inlineCode: InlineCode,
  img: ResponsiveImage,
  h1: (props) => <H1 as="h1" {...props} />,
  h2: (props) => <H2 as="h2" {...props} />,
  h3: (props) => <H3 as="h3" {...props} />,
  h4: (props) => <H4 as="h4" {...props} />,
  Tweet: (props) => <TwitterEmbed {...props} />,
  // hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  // strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  // pre: Pre,
  // kbd: Kbd,
  // br: ({ reset, ...props }) => (
  //   <Box as={reset ? 'br' : undefined} height={reset ? undefined : '24px'} {...props} />
  // ),
  // a: (props) => (
  //   <a
  //     apply="mdx.a"
  //     color="blue.500"
  //     textDecoration="underline"
  //     fontWeight="semibold"
  //     {...props}
  //   />
  // ),
  // p: (props) => <Paragraph {...props} />,
  // ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  // ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  // li: (props) => <chakra.li pb="4px" {...props} />,
  // blockquote: (props) => (
  //   <Box>
  //     <Alert
  //       role="none"
  //       status="warning"
  //       variant="left-accent"
  //       as="blockquote"
  //       rounded="4px"
  //       {...props}
  //       mx={-4}
  //       w="unset"
  //     />
  //   </Box>
  // ),
}
