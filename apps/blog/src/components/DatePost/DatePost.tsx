import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

type DatePostProps = {
  date: string
  lastmod?: string
}

export const DatePost: React.FC<DatePostProps> = ({ date, lastmod }) => {
  const { t } = useTranslation('common')
  const [datePublished, setDatePublished] = useState('')
  const [dateUpdated, setDateUpdated] = useState('')

  useEffect(() => {
    if (date && window) {
      setDatePublished(format(new Date(date), 'MMM dd, yyyy'))
    }
    if (lastmod && window) {
      setDateUpdated(format(new Date(lastmod), 'MMM dd, yyyy'))
    }
  }, [date, lastmod])

  return (
    <div className="flex items-center justify-center">
      <div className="ml-3 text-right flex gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
        {lastmod && (
          <p className="font-medium italic text-gray-500 group-hover:text-gray-700">
            <span>({t('posts.updated')}</span> <time dateTime={lastmod}>{dateUpdated})</time>
          </p>
        )}
        <p>
          <span className="sr-only">{t('posts.published')}</span>{' '}
          <time dateTime={date}>{datePublished}</time>
        </p>
      </div>
    </div>
  )
}
