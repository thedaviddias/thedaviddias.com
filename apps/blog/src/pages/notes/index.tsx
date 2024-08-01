import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { Notes } from '@/components/Notes'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'

import { NotesType } from '@/types'

type TilProps = {
  notes: NotesType[]
}

const Til = ({ notes }: TilProps) => {
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
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.com/notes',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.com/fr/notes',
          },
        ]}
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <section className="grid grid-cols-1 border-none pt-10 md:items-end md:gap-4">
          <PageHeader
            title={routes(t).notes.h1}
            description={routes(t).notes.seo.description}
            className="col-span-4"
          />
        </section>

        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent notes</h2>
          </header>

          <div className="grid grid-cols-1 lg:col-span-2">
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

export const getStaticProps: GetStaticProps<TilProps> = async ({ locale }) => {
  const notes = getAllPostsWithFrontMatter({ dataType: 'notes', locale })

  const props = {
    notes: JSON.parse(JSON.stringify(notes)),
  }

  return {
    props,
  }
}

export default Til
