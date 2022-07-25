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
      <div className="mb-2 uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 text-sm">
        {t('tags')}
      </div>
      <nav>
        <ul className="flex items-center space-x-5">
          {tags.map((tag) => (
            <li key={tag} className="border border-gray-200 rounded-md">
              <CustomLink
                className="!no-underline block mb-1 px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
