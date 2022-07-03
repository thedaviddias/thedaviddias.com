import React from 'react'

import { Headings } from '@/pages/blog/[slug]'

type TableOfContentsType = {
  items: Headings[]
}

export const TableOfContents = ({ items }: TableOfContentsType) => {
  return (
    <div className="mb-2  text-gray-400 dark:text-gray-500 text-sm">
      <details open>
        <summary className="small-title">Table of Contents</summary>
        <ol>
          {items.map((item) => (
            <li key={item.id} className="mb-2">
              <a
                href={`#${item.id}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:underline"
                data-title="h2"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </div>
  )
}
