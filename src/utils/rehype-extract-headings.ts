import { hasProperty } from 'hast-util-has-property'
import { headingRank, Root } from 'hast-util-heading-rank'
import { toString } from 'hast-util-to-string'
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
    visit(tree, 'element', (node: any) => {
      if (headingRank(node) === rank && node.properties && hasProperty(node, 'id')) {
        headings.push({
          title: toString(node),
          id: node.properties.id.toString(),
        })
      }
    })
  }
}
