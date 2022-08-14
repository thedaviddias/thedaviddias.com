import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { H1, H5 } from '@/components/Headings'
import { Notes } from '@/components/Notes'
import { PageHeader } from '@/components/PageHeader'
import { Search } from '@/components/Search'

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
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.dev/notes',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.dev/fr/notes',
          },
        ]}
      />
      <main className="divide-slate-200 sm:space-y-16 lg:max-w-none">
        <div className="pt-10 border-none grid grid-cols-1 md:grid-cols-4 md:gap-4 md:items-end">
          <PageHeader
            title={routes(t).notes.h1}
            description={routes(t).notes.seo.description}
            className=" col-span-3"
          />
          <div className="flex md:justify-end">
            <Search setSearchValue={setSearchValue} />
          </div>
        </div>

        <section className="border-none">
          <header>
            <h2 className="sr-only">Recent notes</h2>
          </header>

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
