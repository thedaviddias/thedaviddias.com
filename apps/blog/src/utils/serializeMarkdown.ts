import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import { remarkCodeTitles } from '@/utils/remark-code-titles'

/**
 * Transforms markdown content into MDX source and extracts plain text.
 *
 * @param {string} markdownBody - The markdown content to serialize.
 * @returns {Promise<{ mdxSource: any, plainText: string }>} The serialized MDX source and plain text.
 * @example
 * const { mdxSource, plainText } = await serializeMarkdown(markdownBody);
 */
export async function serializeMarkdown(
  markdownBody: string
): Promise<{ mdxSource: any; plainText: string }> {
  const mdxSource = await serialize(markdownBody, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkCodeTitles, remarkUnwrapImages],
      rehypePlugins: [
        [rehypePrismPlus, { ignoreMissing: true }],
        [rehypeImagePlaceholder, { dir: 'public/' }],
        rehypeSlug,
        [rehypeAutolinkHeadings],
      ],
    },
  })

  const plainText = markdownBody
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
    .replace(/[#*_~`]/g, '') // Remove markdown syntax
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim() // Trim whitespace

  return { mdxSource, plainText }
}
