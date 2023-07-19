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
      <article className="pt-2 pb-2 border-t border-gray-200 dark:border-gray-700 relative">
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5">
          <div className="max-w-[37rem] w-full">
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
          </div>
        </div>
      </article>
    </>
  )
}
