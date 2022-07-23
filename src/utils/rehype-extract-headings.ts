import { hasProperty } from 'hast-util-has-property'
import { headingRank } from 'hast-util-heading-rank'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

/**
 * Extracts headings from a unified tree.
 *
 * To be used *AFTER* the `rehype-slug` plugin.
 */
export default function rehypeExtractHeadings({ rank = 2, headings }: ExtractHeadingsConfig) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (headingRank(node) === rank && node.properties && hasProperty(node, 'id')) {
        headings.push({
          title: toString(node),
          id: node.properties.id.toString(),
        })
      }
    })
  }
}
