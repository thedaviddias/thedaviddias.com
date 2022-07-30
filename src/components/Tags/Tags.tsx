import clsx from 'clsx'
import { FC } from 'react'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'

type TagsProps = {
  tags: string[]
  className?: string
  slug?: string
}

export const Tags: FC<TagsProps> = ({ tags, className, slug = '/tag/' }) => {
  return (
    <nav arial-label="Tags">
      <ul className={clsx(`flex items-center flex-wrap`, className)}>
        {tags?.map((tag) => (
          <li
            key={tag}
            className="py-1 px-2 mr-3 mb-2 text-base font-medium leading-6 text-gray-600 bg-gray-100 hover:ring-2 ring-gray-300 dark:text-gray-100 dark:bg-gray-700
            rounded-lg border dark:border-gray-800 border-solid cursor-pointer
            dark:hover:bg-gray-700
            "
          >
            <CustomLink
              className="!font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x space-y-2 !no-underline"
              href={`${slug}${slugify(tag, { lower: true })}`}
            >
              {tag}
            </CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
