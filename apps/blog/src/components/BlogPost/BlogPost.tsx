import humanizeString from 'humanize-string'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'
import { H2 } from '@/components/Headings'

import { DisplayViews } from '../DisplayViews'

import { ArticlesType } from '@/types'

export type BlogPostProps = {
  post: ArticlesType
  isCategoryPage?: string | string[]
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, isCategoryPage }) => {
  const { t } = useTranslation('common')

  return (
    <article className="md:pt-6 pb-6 border-t border-gray-200 dark:border-gray-700" key={post.slug}>
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-5">
        <div className="max-w-[44rem] w-full">
          {!isCategoryPage && (
            <div className="!mb-1">
              {post.frontMatter.categories?.length && (
                <CustomLink
                  href={`${t('category.path')}/${slugify(post.frontMatter.categories[0], {
                    lower: true,
                  })}`}
                  className="inline-block pb-2 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x"
                >
                  <span className="sr-only">Category: </span>
                  {humanizeString(post.frontMatter.categories[0])}
                </CustomLink>
              )}
            </div>
          )}
          <H2 as="h3">
            <CustomLink
              className="dark:!text-gray-100 inline-block tracking-tight"
              href={`/articles/${post.slug}`}
            >
              {post.frontMatter.title}
            </CustomLink>
          </H2>

          <p className="!text-gray-600 dark:!text-gray-300 !mt-4">{post.frontMatter.description}</p>

          {isCategoryPage && (
            <div className="mt-4">
              <DisplayViews slug={post.slug} />
            </div>
          )}
        </div>
        <div className="flex-grow text-left lg:text-right relative h-[10rem]">
          <Image
            className="object-cover rounded-md"
            src={post.frontMatter.preview.url}
            fill
            alt={post.frontMatter.preview.alt || ''}
            aria-hidden="true"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </article>
  )
}
