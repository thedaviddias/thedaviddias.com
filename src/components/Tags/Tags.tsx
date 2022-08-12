import clsx from 'clsx'
import useTranslation from 'next-translate/useTranslation'
import slugify from 'slugify'

import { CustomLink } from '@/components/CustomLink'

type TagsProps = {
  tags: string[]
  className?: string
  slug?: string
}

export const Tags: React.FC<TagsProps> = ({ tags, className, slug }) => {
  const { t } = useTranslation('common')

  const currentSlug = t('tags.path') || slug

  return (
    <div className="mb-5 mt-5">
      <ul className={clsx(`flex items-center flex-wrap gap-x-3 gap-y-4`, className)}>
        {tags?.map((tag) => (
          <li key={tag}>
            <CustomLink
              href={`${currentSlug}/${slugify(tag, { lower: true })}`}
              className="!font-semibold hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x space-y-2 !no-underline py-1 px-2 mb-2 text-base leading-6 text-gray-600 bg-gray-100 hover:ring-2 ring-gray-300 dark:bg-gray-700
              rounded-lg border dark:border-gray-800 border-solid
              dark:hover:bg-gray-700"
            >
              {tag}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
