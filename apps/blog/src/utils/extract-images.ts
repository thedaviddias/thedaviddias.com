import { Root } from 'rehype-autolink-headings/lib'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export const extractImagesFromMarkdown = (markdown: string) => {
  const images: string[] = []

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(
      () => (tree: Root) =>
        visit(tree, 'element', (node) => {
          if (node.tagName === 'img') {
            images.push(node.properties?.src as string)
          }
        })
    )
    .use(rehypeStringify)

  processor.processSync(markdown)

  return { images }
}
