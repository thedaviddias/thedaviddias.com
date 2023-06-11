import { hasProperty } from 'hast-util-has-property'
import { headingRank } from 'hast-util-heading-rank'
import { Element, toString } from 'hast-util-to-string'
import { Parent, visit } from 'unist-util-visit'

type ExtractHeadingsConfig = {
  rank: number
  headings: { title: string; id: string }[]
}

/**
 * Extracts headings from a unified tree.
 *
 * To be used *AFTER* the `rehype-slug` plugin.
 */
export const rehypeExtractHeadings = ({ rank = 2, headings }: ExtractHeadingsConfig) => {
  return (tree: Parent) => {
    visit(tree, 'element', (node: Element) => {
      if (headingRank(node) === rank && node.properties && hasProperty(node, 'id')) {
        if (node.properties.id !== null && node.properties.id !== undefined) {
          headings.push({
            title: toString(node),
            id: node.properties.id.toString(),
          })
        }
      }
    })
  }
}
