import React, { FC } from 'react'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'

type MetricsCardProps = {
  link: string
  metric?: number
  header: string
  stat?: string
  isCurrency?: boolean
}

export const MetricsCard: FC<MetricsCardProps> = ({
  header,
  link,
  metric,
  stat,
  isCurrency = false,
}) => {
  return (
    <article className="flex flex-col border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-4 h-full border">
      <H5 as="h3">
        <CustomLink href={link} className="dark:text-blue-300 font-semibold mb-3">
          {header}
        </CustomLink>
      </H5>
      <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
        {metric && metric > 0 && isCurrency
          ? metric.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          : ''}
        {metric && metric > 0 && !isCurrency ? metric.toLocaleString() : ''}
        {stat && stat ? stat : ''}
      </p>
    </article>
  )
}
