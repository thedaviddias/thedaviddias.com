import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { PageHeader } from '@/components/PageHeader'
import { Paragraph } from '@/components/Paragraph'
import { Search } from '@/components/Search'

import { CONTENT_TYPE } from '@/constants'
import { getTags, TagsInfo } from '@/utils/get-articles-posts'

type TagsPageProps = {
  tags: TagsInfo[]
}

const TagsPage: NextPage<TagsPageProps> = ({ tags }) => {
  const { t } = useTranslation('common')
  const [searchValue, setSearchValue] = useState('')

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Container>
      <NextSeo
        title={t('tags.seo.title_all')}
        description={t('tags.seo.description_all')}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.dev/tags',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.dev/fr/tags',
          },
        ]}
      />
      <main>
        <section className="pt-10 border-none grid grid-cols-1 md:grid-cols-4 md:gap-4 md:items-end">
          <PageHeader
            title={t('tags.seo.title_all')}
            description={t('tags.seo.description_all')}
            className=" col-span-3"
          />
          <div className="flex md:justify-end">
            <Search setSearchValue={setSearchValue} />
          </div>
        </section>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!filteredTags.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">{t('posts.empty')}</p>
          )}
          {filteredTags.map((tag) => (
            <li key={tag.name}>
              <div className="flex flex-col border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-4 h-full border relative overflow-hidden hover:scale-[1.01] transition-all">
                <CustomLink
                  href={`${t('tags.path')}/${tag.name}`}
                  className="dark:text-blue-300 font-semibold mb-3 text-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
                >
                  {tag.name}
                </CustomLink>
                <Paragraph>{tag?.description}</Paragraph>
                <p className="text-sm dark:text-slate-400 mt-auto">{`${tag?.occurrences} post${tag?.occurrences === 1 ? '' : 's'
                  } published`}</p>
                {tag?.logo && (
                  <Image
                    src={tag?.logo}
                    alt=""
                    width={60}
                    height={60}
                    className="absolute -top-4 -right-4"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const articleTags = await getTags(CONTENT_TYPE.ARTICLE, locale)
  const notesTags = await getTags(CONTENT_TYPE.NOTE, locale)

  const tags = [...articleTags, ...notesTags]

  const props = {
    tags: JSON.parse(JSON.stringify(tags)),
  }

  return {
    props,
  }
}

export default TagsPage
