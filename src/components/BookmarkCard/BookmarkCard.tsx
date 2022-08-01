import clsx from 'clsx'
import { FC } from 'react'

import { Bookmark } from '@/pages/bookmarks'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'

type BookmarkCardProps = Bookmark & {
  filterBookmarks: (arg: string) => void
  selectedTag?: string
}

export const BookmarkCard: FC<BookmarkCardProps> = ({
  title,
  cover,
  link,
  tags,
  filterBookmarks,
  selectedTag,
}) => {
  return (
    <article>
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 aspect-video">
          <img alt={`Thumbnail of ${title}`} src={cover} className="aspect-video rounded-lg" />
        </div>
        <H5 as="h2">
          <CustomLink
            href={link}
            className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
          >
            {title}
          </CustomLink>
        </H5>
      </div>

      <ul className="flex items-center flex-wrap">
        {tags.map((tag) => (
          <li
            key={tag}
            className={clsx(
              `py-1 px-2 mr-3 mb-2 text-base font-medium leading-6 text-gray-600 bg-gray-100 hover:ring-2 ring-gray-300 dark:text-gray-100 dark:bg-gray-700
          rounded-lg border dark:border-gray-800 border-solid cursor-pointer
          dark:hover:bg-gray-700`,
              selectedTag === tag ? 'dark:bg-white' : 'ghost'
            )}
          >
            <button
              onClick={() => filterBookmarks(tag)}
              className={clsx(
                `!font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-xs space-y-2 !no-underline`
              )}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
