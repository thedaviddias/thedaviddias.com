import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'

type TagsProps = {
  tags: string[]
}

export const Tags: FC<TagsProps> = ({ tags }) => {
  const { t } = useTranslation('common')

  return (
    <aside className="w-full mt-3 print:hidden">
      <div className="small-title">{t('tags')}</div>
      <nav arial-label="Tags">
        <ul className="flex items-center flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag}
              className="py-1 px-2 mr-3 mb-2 text-base font-medium leading-6 text-gray-600 bg-gray-100 hover:ring-2 ring-gray-300 dark:text-gray-100 dark:bg-gray-700
            rounded-lg border dark:border-gray-800 border-solid cursor-pointer
            dark:hover:bg-gray-700
            "
            >
              <CustomLink
                className="!no-underline font-medium leading-6 dark:text-gray-100 cursor-pointer"
                href={`/tag/${slugify(tag, { lower: true })}`}
              >
                {tag}
              </CustomLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
