import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'

type DatePostProps = {
  date: string
  lastmod?: string
}

export const DatePost: React.FC<DatePostProps> = ({ date, lastmod }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center justify-center">
      <div className="ml-3 text-right flex gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
        {lastmod && (
          <p className="font-medium italic text-gray-500 group-hover:text-gray-700">
            <span>({t('posts.updated')}</span>{' '}
            <time dateTime={lastmod}>{format(new Date(lastmod), 'MMM dd, yyyy')})</time>
          </p>
        )}
        <time dateTime={date}>{format(new Date(date), 'MMM dd, yyyy')}</time>{' '}
      </div>
    </div>
  )
}
