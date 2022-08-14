import useTranslation from 'next-translate/useTranslation'
import React, { ChangeEvent } from 'react'

type SearchProps = {
  setSearchValue: (arg: string) => void
}

export const Search: React.FC<SearchProps> = ({ setSearchValue }) => {
  const { t } = useTranslation('common')

  return (
    <form className="relative w-full md:w-96 mb-4 md:text-right mb-8">
      <fieldset>
        <legend>{t('articles.sections.search')}</legend>
        <input
          aria-label="Search articles"
          type="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder={t('articles.sections.search_placeholder')}
          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </fieldset>
    </form>
  )
}
