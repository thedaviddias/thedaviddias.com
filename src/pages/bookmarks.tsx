import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { BookmarkCard } from '@/components/BookmarkCard'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'

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
    <BaseLayout
      title={routes(t).bookmarks.seo.title}
      description={routes(t).bookmarks.seo.description}
      openGraph={routes(t).bookmarks.seo}
    >
      <PageHeader title={`Bookmarks`} description={routes(t).bookmarks.seo.description} />

      <div className="mb-5 mt-5">
        <ul className="flex gap-x-5">
          <li>
            <button onClick={() => filterBookmarks()}>All</button>
          </li>
          {tags.map((tag) => (
            <li key={tag}>
              <button onClick={() => filterBookmarks(tag)}>{tag}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-xl">
        {displayBookmarks.map(({ cover, link, title, tags }) => (
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
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const req = await fetch(
    `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROP_COLLECTION}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
      },
    }
  )

  const data = await req.json()

  const bookmarks = data.items.map(({ cover, title, link, tags }: Bookmark) => ({
    link,
    title,
    cover,
    tags,
  })) as Bookmark[]

  const tags = Array.from(new Set(bookmarks.flatMap(({ tags }) => tags)))

  const props: Props = { bookmarks, tags }

  return {
    props,
    revalidate: 60 * 60,
  }
}

export default Bookmarks
