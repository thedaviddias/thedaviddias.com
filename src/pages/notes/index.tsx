import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { H1, H5 } from '@/components/Headings'
import { Notes } from '@/components/Notes'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-articles-posts'

type BlogProps = {
  notes: any[]
}

const Til = ({ notes }: BlogProps) => {
  const { t } = useTranslation('common')
  const [searchValue, setSearchValue] = useState('')

  const filteredNotes = notes.filter((note) =>
    note.frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Container>
      <NextSeo
        title={routes(t).notes.seo.title}
        description={routes(t).notes.seo.description}
        openGraph={routes(t).notes.seo}
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <section className="pt-10 border-none">
          <header>
            <H1>{routes(t).notes.seo.title}</H1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">
              {routes(t).notes.seo.description}
            </p>
          </header>
        </section>
        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent notes</h2>
          </header>
          <form className="relative w-full mb-4">
            <fieldset>
              <H5 as="legend">{t('notes.sections.search')}</H5>
              <input
                aria-label="Search articles"
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('articles.sections.search_placeholder')}
                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </fieldset>
          </form>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {!filteredNotes.length && (
              <p className="mb-4 text-gray-600 dark:text-gray-400">{t('posts.empty')}</p>
            )}
            {filteredNotes.map((post) => (
              <Notes key={post.frontMatter.title} note={post} />
            ))}
          </div>
        </section>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ locale }) => {
  const notes = getAllPostsWithFrontMatter({ dataType: 'notes', locale })

  const props = {
    notes: JSON.parse(JSON.stringify(notes)),
  }

  return {
    props,
  }
}

export default Til
