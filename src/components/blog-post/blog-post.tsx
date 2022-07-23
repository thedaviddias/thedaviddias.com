import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import slugify from 'slugify'

import { H3 } from '@/components/heading'
import { NextLink } from '@/components/next-link'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

export const BlogPost = ({ post }: { post: BlogPostTypes }) => {
  const { t } = useTranslation('common')

  return (
    <article className="pt-10 pb-8 border-t border-gray-200 dark:border-gray-700" key={post.slug}>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="max-w-[37rem] w-full">
          <H3>
            <NextLink
              className="!text-xl sm:!text-2xl !font-extrabold tracking-tight serif:tracking-normal serif:font-title-serif !text-gray-900 dark:!text-gray-100 block"
              href={`/blog/${post.slug}`}
            >
              {post.frontMatter.title}
            </NextLink>
          </H3>

          <div className="!text-sm sm:!text-base !text-gray-600 dark:!text-gray-400 !mt-2">
            {post.frontMatter.description}
          </div>
        </div>
        <div className="flex-grow text-left lg:text-right lg:ml-8">
          <div className="float-right lg:float-none !mb-1">
            {post.frontMatter.categories && (
              <NextLink
                href={`/category/${slugify(post.frontMatter.categories[0])}`}
                passHref
                className="block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x"
              >
                <span className="sr-only">Category: </span>
                {post.frontMatter.categories[0]}
              </NextLink>
            )}
          </div>
          <div className="inline-block lg:block !text-gray-500 dark:!text-gray-400 !font-medium text-xs !mb-1 align-top">
            <time dateTime={post.frontMatter.date.toString()}>
              {format(new Date(post.frontMatter.date.toString()), 'eee, dd MMM yyyy')}
            </time>
          </div>
        </div>
      </div>
      <NextLink
        className="!no-underline !text-gray-800 hover:!text-black dark:!text-gray-200 dark:hover:!text-white !text-sm sm:!text-base sm:!text-lg !font-semibold !mt-2 !mb-1 sm:!mt-4 block"
        href={`/blog/${post.slug}`}
      >
        {t('posts.continue')}
      </NextLink>
    </article>
  )
}
