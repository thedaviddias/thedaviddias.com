import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { Container } from '@/components/Container'
import { CustomLink } from '@/components/CustomLink'
import { PageHeader } from '@/components/PageHeader'

import { CONTENT_TYPE } from '@/constants'
import { getTags } from '@/utils/get-articles-posts'

type TagsPageProps = {
  tags: string[]
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
      <ul className="flex flex-wrap gap-x-5">
        {tags?.map((tag) => (
          <li key={tag}>
            <CustomLink href={`${t('tags.path')}/${tag}`} className="text-xl">
              {tag}
            </CustomLink>
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
