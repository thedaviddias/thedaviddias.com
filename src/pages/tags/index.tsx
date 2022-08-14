import { GetStaticProps, NextPage } from 'next'
import Image from 'next/future/image'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { PageHeader } from '@/components/PageHeader'
import { Paragraph } from '@/components/Paragraph'

import { CONTENT_TYPE } from '@/constants'
import { getTags, TagsInfo } from '@/utils/get-articles-posts'

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
            href: 'https://thedaviddias.dev/tags',
          },
          {
            hrefLang: 'fr',
            href: 'https://thedaviddias.dev/fr/tags',
          },
        ]}
      />
      <PageHeader title={t('tags.seo.title_all')} description={t('tags.seo.description_all')} />
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tags?.map((tag) => (
          <li key={tag.name}>
            <div className="flex flex-col border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-4 h-full border relative overflow-hidden">
              <CustomLink
                href={`${t('tags.path')}/${tag.name}`}
                className="dark:text-blue-300 font-semibold mb-3 text-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
              >
                {tag.name}
              </CustomLink>
              <Paragraph>{tag?.description}</Paragraph>
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
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tags = await getTags(CONTENT_TYPE.ARTICLE, locale)

  const props = {
    tags: JSON.parse(JSON.stringify(tags)),
  }

  return {
    props,
  }
}

export default TagsPage
