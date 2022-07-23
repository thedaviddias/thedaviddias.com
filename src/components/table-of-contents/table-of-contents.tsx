import React from 'react'

export const TableOfContents = (props) => {
  return (
    <div className="mb-2  text-gray-400 dark:text-gray-500 text-sm">
      <details open>
        <summary className="uppercase font-semibold">Table of Contents</summary>
        <ol>
          {props.items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
