import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import { Parent, visit } from 'unist-util-visit'

export const extractLinks = (html: string) => {
  const processor = unified()
    .use(rehypeParse, { fragment: true }) // Parse as fragment, not full HTML document
    .use(
      () => (tree: Parent) =>
        visit(tree, 'element', (node: any) => {
          if (node.tagName === 'a') {
            node.properties = node.properties || {}
            node.properties.className = 'external-link'
            node.properties.rel = 'noopener noreferrer'
            node.properties.target = '_blank'
          }
        })
    )
    .use(rehypeStringify)

  const result = processor.processSync(html).toString()

  return result
}
