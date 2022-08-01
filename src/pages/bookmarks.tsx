import { clsx } from 'clsx'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BookmarkCard } from '@/components/BookmarkCard'
import { Container } from '@/components/Container'
import { H3 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { loadBookmarks } from '@/utils/load-bookmarks'

export type Bookmark = {
  link: string
  title: string
  cover: string
  tags: string[]
}

type Props = {
  bookmarks: Bookmark[]
  tags: string[]
}

const Bookmarks = ({ bookmarks, tags }: Props) => {
  const { t } = useTranslation('common')

  const [displayBookmarks, setDisplayBookmarks] = useState(bookmarks)
  const [selectedTag, setSelectedTag] = useState<string>()

  const filterBookmarks = (tag?: string) => {
    if (tag) {
      setDisplayBookmarks(bookmarks.filter(({ tags }) => tags.includes(tag)))
    } else {
      setDisplayBookmarks(bookmarks)
    }
    setSelectedTag(tag)
  }

  return (
    <Container>
      <PageHeader
        title={routes(t).bookmarks.seo.title}
        description={routes(t).bookmarks.seo.description}
      />

      <div className="mb-5 mt-5">
        <H3 as="h2">{t('bookmarks.bookmark_filter')}</H3>

        <ul className="flex gap-x-5">
          <li>
            <button
              onClick={() => filterBookmarks()}
              className={clsx(
                `block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x`,
                !selectedTag ? 'dark:underline dark:!text-white' : ''
              )}
            >
              All
            </button>
          </li>
          {tags?.map((tag) => (
            <li key={tag}>
              <button
                onClick={() => filterBookmarks(tag)}
                className={clsx(
                  `block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x`,
                  selectedTag === tag ? 'dark:underline dark:!text-white' : ''
                )}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-xl">
        {displayBookmarks?.map(({ cover, link, title, tags }) => (
          <BookmarkCard
            key={link}
            title={title}
            cover={cover}
            link={link}
            tags={tags}
            filterBookmarks={filterBookmarks}
            selectedTag={selectedTag}
          />
        ))}
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const req = await loadBookmarks()

  const bookmarks = req
    ? req.items.map(({ cover, title, link, tags }: Bookmark) => ({
        link,
        title,
        cover,
        tags,
      }))
    : []

  const tags = bookmarks ? Array.from(new Set(bookmarks.flatMap(({ tags }) => tags))) : []

  const props: Props = { bookmarks, tags }

  return {
    props,
    revalidate: 60 * 60,
  }
}

export default Bookmarks
