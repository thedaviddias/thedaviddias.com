import { format } from 'date-fns'
import Link from 'next/link'
import slugify from 'slugify'

import { H3 } from '../heading'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

export const BlogPost = ({ post }: { post: BlogPostTypes }) => {
  return (
    <>
      <article className="pt-10 pb-8 border-t border-gray-200 dark:border-gray-700" key={post.slug}>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="max-w-[37rem] w-full">
            <H3>
              <Link
                className="!no-underline !text-xl sm:!text-2xl !font-extrabold tracking-tight serif:tracking-normal serif:font-title-serif !text-gray-900 dark:!text-gray-100 block"
                href={`/blog/${post.slug}`}
              >
                {post.frontMatter.title}
              </Link>
            </H3>

            <div className="!text-sm sm:!text-base !text-gray-600 dark:!text-gray-400 !mt-2">
              {post.frontMatter.description}
            </div>
          </div>
          <div className="flex-grow text-left lg:text-right lg:ml-8">
            <div className="float-right lg:float-none !mb-1">
              {post.frontMatter.categories && (
                <Link href={`/category/${slugify(post.frontMatter.categories[0])}`} passHref>
                  <a className="block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x">
                    {/* <a className="!text-sm sm:!text-base lg:!text-lg !font-semibold lg:!font-extrabold !text-gray-700 hover:!text-black dark:!text-gray-300 dark:hover:!text-white"> */}
                    <span className="sr-only">Category: </span>
                    {post.frontMatter.categories[0]}
                  </a>
                </Link>
              )}
            </div>
            <div className="inline-block lg:block !text-gray-500 dark:!text-gray-400 !font-medium !text-sm sm:!text-base !mb-1 align-top">
              <time dateTime="2021-12-17T05:00:00.000Z">
                {format(new Date(post.frontMatter.date.toString()), 'eee, dd MMM yyyy')}
              </time>
            </div>
          </div>
        </div>
        <a
          className="!no-underline !text-gray-800 hover:!text-black dark:!text-gray-200 dark:hover:!text-white !text-sm sm:!text-base sm:!text-lg !font-semibold !mt-2 !mb-1 sm:!mt-4 block"
          href={`/blog/${post.slug}`}
        >
          Continue reading →
        </a>
      </article>
    </>
  )
}
