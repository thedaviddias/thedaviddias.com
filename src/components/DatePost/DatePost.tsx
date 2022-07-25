
import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

type DatePostProps = {
  date: string
  lastmod?: string
}

export const DatePost: FC<DatePostProps> = ({ date, lastmod }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center justify-center">
      <div className="ml-3 text-right">
        <p className="text-base font-medium text-gray-700 dark:text-gray-400">
          <time dateTime={date}>{format(new Date(date), 'MMM dd, yyyy')}</time>{' '}
        </p>
        {lastmod && (
          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
            <span>({t('posts.updated')}</span>{' '}
            <time dateTime={lastmod}>{format(new Date(lastmod), 'MMM dd, yyyy')})</time>
          </p>
        )}
      </div>
    </div>
  )
}
