import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'
import { Notes } from '../Notes'

type LatestPostsSection = {
  notes: any[]
}

export const LatestNotesSection: React.FC<LatestPostsSection> = ({ notes }) => {
  const { t } = useTranslation('common')

  return (
    <section className="grid grid-cols-1 gap-y-10 border-none mb-10">
      <header>
        <H5 as="h2">{t('notes.sections.latest-notes')}</H5>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {!notes.length ? (
          <p>{t('notes.sections.empty')}</p>
        ) : (
          <>
            {notes?.map((note) => (
              <Notes key={note.frontMatter.title} note={note} />
            ))}
          </>
        )}
      </div>
      {notes.length ? (
        <footer className="text-right">
          <CustomLink href="/articles">{t('notes.sections.viewAll')}</CustomLink>
        </footer>
      ) : null}
    </section>
  )
}
