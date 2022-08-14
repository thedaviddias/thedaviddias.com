import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

import { CustomLink } from '@/components/CustomLink'
import { H4 } from '@/components/Headings'
import { Tags } from '@/components/Tags'

type NotesProps = {
  note: any
}

export const Notes: React.FC<NotesProps> = ({ note }) => {
  const { t } = useTranslation('common')
  const [datePublished, setDatePublished] = useState('')

  useEffect(() => {
    if (note.frontMatter.date && window) {
      setDatePublished(format(new Date(note.frontMatter.date.toString()), t('date')))
    }
  }, [note.frontMatter.date, t])

  return (
    <>
      <article className="pt-3 pb-0 border-t border-gray-200 dark:border-gray-700 relative">
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5">
          <div className="max-w-[30rem] w-full">
            <H4 as="h3">
              <CustomLink
                className="dark:!text-gray-100 block tracking-tight"
                href={`/notes/${note.slug}`}
              >
                {note.frontMatter.title}
              </CustomLink>
            </H4>
          </div>
          <div className="flex-grow text-left lg:text-right">
            <div className="flex lg:justify-end flex-wrap">
              <Tags tags={note.frontMatter.tags} className="justify-center" />
            </div>
            <div className="inline-block lg:block !text-gray-500 dark:text-gray-300 !font-medium !mb-1 align-top">
              <time dateTime={note.frontMatter.date.toString()}>{datePublished}</time>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
