import useTranslation from 'next-translate/useTranslation'
import React, { useEffect, useState } from 'react'

import { Headings } from '@/pages/articles/[slug]'

type TableOfContentsType = {
  headings: Headings[]
}

export const TableOfContents = ({ headings }: TableOfContentsType) => {
  const { t } = useTranslation('common')

  function getIDs(items: Headings[]) {
    return items.map((item) => item.id)
  }

  function useActiveId(itemIds: string[]) {
    const [activeId, setActiveId] = useState(``)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: `0% 0% -80% 0%` }
      )

      const headingElements = Array.from(document.querySelectorAll('h2'))
      headingElements.forEach((id) => observer?.observe(id))

      return () => observer.disconnect()
    }, [itemIds])

    return activeId
  }

  const idList = getIDs(headings)
  const activeId = useActiveId(idList)

  return (
    <div className="mb-2  text-sm text-gray-400 dark:text-gray-500">
      <details open>
        <summary className="small-title">{t('posts.tableContent')}</summary>
        <ol>
          {headings.map((heading) => (
            <li key={heading.id} className="mb-2">
              <a
                href={`#${heading.id}`}
                className={
                  heading.id === activeId
                    ? 'text-base font-bold text-gray-800 dark:text-white'
                    : `text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100`
                }
                data-title="h2"
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}
