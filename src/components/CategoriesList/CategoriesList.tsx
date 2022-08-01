import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'

type CategoriesListProps = {
  categories: string[]
}

export const CategoriesList: FC<CategoriesListProps> = ({ categories }) => {
  return (
    <div className="mb-5 mt-5">
      <ul className="flex gap-x-5">
        {categories?.map((category, i) => (
          <li key={i}>
            <CustomLink
              href={`/category/${category}`}
              passHref
              className="block mb-1 !font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 uppercase text-x"
            >
              {category}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
