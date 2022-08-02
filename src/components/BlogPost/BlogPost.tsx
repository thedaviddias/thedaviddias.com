import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'
import { H2 } from '@/components/Headings'

type BlogPostProps = {
  post: any
  isCategoryPage?: string | string[]
}

export const BlogPost: FC<BlogPostProps> = ({ post, isCategoryPage }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <article className="pt-8 pb-6 border-t border-gray-200 dark:border-gray-700" key={post.slug}>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="max-w-[44rem] w-full">
            <H2 as="h3">
              <CustomLink
                className="dark:!text-gray-100 block tracking-tight"
                href={`/articles/${post.slug}`}
              >
                {post.frontMatter.title}
              </CustomLink>
            </H2>

            <p className="!text-gray-600 dark:!text-gray-400 !mt-4">
              {post.frontMatter.description}
            </p>
          </div>
          <div className="flex-grow text-left lg:text-right lg:ml-8">
            {!isCategoryPage && (
              <div className="float-right lg:float-none !mb-1">
                {post.frontMatter.categories?.length && (
                  <CustomLink
                    href={`${t('category.path')}/${slugify(post.frontMatter.categories[0], {
                      lower: true,
                    })}`}
                    className="block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x"
                  >
                    <span className="sr-only">Category: </span>
                    {post.frontMatter.categories[0]}
                  </CustomLink>
                )}
              </div>
            )}
            <div className="inline-block lg:block !text-gray-500 dark:text-gray-300 !font-medium !mb-1 align-top">
              <time dateTime={post.frontMatter.date.toString()}>
                {format(new Date(post.frontMatter.date.toString()), 'MMM dd, yyyy')}
              </time>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
