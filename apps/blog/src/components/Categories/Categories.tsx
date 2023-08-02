import humanizeString from 'humanize-string'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'

import { ListAllTags } from '@/types'

type CategoriesListProps = {
  categories: ListAllTags[]
}

export const Categories: React.FC<CategoriesListProps> = ({ categories }) => {
  const { t } = useTranslation('common')

  return (
    <nav className="mb-5 mt-5">
      <ul className="flex flex-wrap gap-x-3 gap-y-4">
        {categories?.map((category) => (
          <li key={category.name}>
            <CustomLink
              href={`${t('category.path')}/${category.name}`}
              className="mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x"
            >
              {humanizeString(category.name)}
            </CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
