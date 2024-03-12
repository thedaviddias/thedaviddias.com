import { CustomLink } from '@/components/CustomLink'
import { H4 } from '@/components/Headings'
import { Tags } from '@/components/Tags'

import { NotesType } from '@/types'

type NotesProps = {
  note: NotesType
}

export const Notes: React.FC<NotesProps> = ({ note }) => {
  return (
    <>
      <article className="relative border-t border-gray-200 pb-2 pt-2 dark:border-gray-700">
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
          <div className="w-full max-w-[37rem]">
            <H4 as="h3">
              <CustomLink
                className="block tracking-tight dark:!text-gray-100"
                href={`/notes/${note.slug}`}
              >
                {note.frontMatter.title}
              </CustomLink>
            </H4>
          </div>
          <div className="flex-grow text-left lg:text-right">
            <div className="flex flex-wrap lg:justify-end">
              <Tags tags={note.frontMatter.tags} className="justify-center" />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
