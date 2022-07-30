import { format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'
import { H4 } from '@/components/Headings'
import { Tags } from '@/components/Tags'

type NotesProps = {
  note: any
}

export const Notes: FC<NotesProps> = ({ note }) => {
  const { t } = useTranslation('common')

  const pathSlug = t('tags.pathNote')

  return (
    <>
      <article className="pt-3 pb-0 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="max-w-[30rem] w-full">
            <H4 as="h3">
              <CustomLink
                className="dark:!text-gray-100 block tracking-tight"
                href={`/notes/${note.slug}`}
              >
                {note.frontMatter.title}
              </CustomLink>
            </H4>
            <p className="!text-gray-600 dark:!text-gray-400 !mt-4">
              {note.frontMatter.description}
            </p>
          </div>
          <div className="flex-grow text-left lg:text-right lg:ml-8">
            <div className="flex justify-end flex-wrap">
              <Tags tags={note.frontMatter.tags} />
              {/* <Tags tags={note.frontMatter.tags} slug={pathSlug} /> */}
            </div>
            <div className="inline-block lg:block !text-gray-500 dark:text-gray-300 !font-medium !mb-1 align-top">
              <time dateTime={note.frontMatter.date.toString()}>
                {format(new Date(note.frontMatter.date.toString()), 'MMM dd, yyyy')}
              </time>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
