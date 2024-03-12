import clsx from 'clsx'
import humanizeString from 'humanize-string'
import useTranslation from 'next-translate/useTranslation'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'

type TagsProps = {
  tags: string[] | undefined
  className?: string
  slug?: string
}

export const Tags: React.FC<TagsProps> = ({ tags, className, slug }) => {
  const { t } = useTranslation('common')

  const currentSlug = t('tags.path') || slug

  return (
    <div className="md:mb-5 md:mt-0">
      <ul className={clsx(`flex flex-wrap items-center gap-x-3 gap-y-4`, className)}>
        {tags?.map((tag) => (
          <li key={tag}>
            <CustomLink
              href={`${currentSlug}/${slugify(tag, { lower: true })}`}
              className="text-x mb-2 space-y-2 rounded-lg border border-solid bg-gray-100 px-2 py-1 text-xs !font-semibold uppercase leading-6 text-gray-600 !no-underline ring-gray-300 hover:text-gray-900 hover:ring-2 md:text-sm
              dark:border-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-700
              dark:hover:text-gray-100"
            >
              {humanizeString(tag)}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
