import useTranslation from 'next-translate/useTranslation'
import GoodreadsBookshelf from 'react-goodreads-shelf'

import { H5 } from '@/components/Headings'

export const CurrentlyReading = ({ limit = 3 }) => {
  const { t } = useTranslation('common')

  return (
    <section className="grid grid-cols-1 gap-y-5 border-none mb-10">
      <header>
        <H5 as="h2">{t('books.currently')}</H5>
      </header>
      <GoodreadsBookshelf
        userId="60055286-david-dias"
        shelf="currently-reading"
        limit={limit}
        width={120}
        displayOptions={{
          hideDetails: true,
        }}
      />
    </section>
  )
}
