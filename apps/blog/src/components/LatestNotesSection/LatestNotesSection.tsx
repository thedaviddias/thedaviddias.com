import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'
import { Notes } from '../Notes'

import { NotesType } from '@/types'

type LatestNotesSection = {
  notes: NotesType[]
}

export const LatestNotesSection: React.FC<LatestNotesSection> = ({ notes }) => {
  const { t } = useTranslation('common')

  return (
    <section className="border-none mb-5 md:mb-10">
      <div className="grid grid-cols-1 ">
        <header className="mb-5">
          <H5 as="h2">{t('notes.sections.latest-notes')}</H5>
        </header>
        <div className="grid grid-cols-1 lg:col-span-2">
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
      </div>
    </section>
  )
}
