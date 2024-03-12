import useTranslation from 'next-translate/useTranslation'
import React, { ChangeEvent } from 'react'

export type SearchProps = {
  setSearchValue: (arg: string) => void
}

export const Search: React.FC<SearchProps> = ({ setSearchValue }) => {
  const { t } = useTranslation('common')

  return (
    <form className="relative w-full md:w-96" role="search">
      <fieldset>
        <legend>{t('articles.sections.search')}</legend>
        <input
          aria-label="Search articles"
          type="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder={t('articles.sections.search_placeholder')}
          className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
        />
      </fieldset>
    </form>
  )
}
