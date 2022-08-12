import GoodreadsBookshelf from 'react-goodreads-shelf'

import { H5 } from '../Headings'

export const CurrentlyReading = ({ limit = 3 }) => {
  return (
    <section className="grid grid-cols-1 gap-y-5 border-none mb-10">
      <header>
        <H5 as="h2">Currently Reading</H5>
      </header>
      <GoodreadsBookshelf userId="60055286-david-dias" shelf="currently-reading" limit={limit} />
    </section>
  )
}
