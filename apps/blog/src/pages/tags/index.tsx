import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { PageHeader } from '@/components/PageHeader'
import { Paragraph } from '@/components/Paragraph'

import { CONTENT_TYPE } from '@/constants'
import { getTags, TagsInfo } from '@/utils/get-article-posts/getTags'

type TagsPageProps = {
  tags: TagsInfo[]
}

const TagsPage: NextPage<TagsPageProps> = ({ tags }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={t('tags.seo.title_all')}
        description={t('tags.seo.description_all')}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://thedaviddias.com/tags',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.com/fr/tags',
          },
        ]}
      />
      <main>
        <section className="grid grid-cols-1 border-none pt-10 md:grid-cols-4 md:items-end md:gap-4">
          <PageHeader
            title={t('tags.seo.title_all')}
            description={t('tags.seo.description_all')}
            className=" col-span-3"
          />
        </section>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <li key={tag.name}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-md border border-gray-300 p-4 text-gray-800 transition-all hover:scale-[1.01] dark:border-gray-700 dark:text-gray-200">
                <CustomLink
                  href={`${t('tags.path')}/${tag.name}`}
                  className="mb-3 text-xl font-semibold before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:content-[''] dark:text-blue-300"
                >
                  {tag.name}
                </CustomLink>
                <Paragraph>{tag?.description}</Paragraph>
                <p className="mt-auto text-sm dark:text-slate-400">{`${tag?.occurrences} post${
                  tag?.occurrences === 1 ? '' : 's'
                } published`}</p>
                {tag?.logo && (
                  <Image
                    src={tag?.logo}
                    alt=""
                    width={60}
                    height={60}
                    className="absolute -right-4 -top-4"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
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
