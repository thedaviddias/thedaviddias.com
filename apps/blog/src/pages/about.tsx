import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { SocialProfileJsonLd } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getPostBySlug } from '@/utils/get-article-posts/getPostBySlug'
import { listSocialUrl } from '@/utils/list-social-url'

import social from '../../../../data/social.json'

type AboutProps = {
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const About: NextPage<AboutProps> = ({ frontMatter, source }) => {
  const { t } = useTranslation()

  const { title, description } = frontMatter

  return (
    <BaseLayout
      title={title}
      description={description}
      openGraph={routes(t).about.seo}
      languageAlternates={[
        {
          hrefLang: 'fr',
          href: 'https://www.canonical.ie/de',
        },
      ]}
      className="border-none pt-10"
    >
      <SocialProfileJsonLd
        type="Person"
        name="David Dias"
        url="https://thedavidias.com"
        sameAs={listSocialUrl(social)}
      />
      <PageHeader title={title} description={description} />

      <MDXRemote {...source} components={MDXComponents} lazy />
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postContent = await getPostBySlug(locale === 'en' ? 'about' : 'a-propos', 'pages', locale)

  const {
    markdownBody,
    frontMatter: { title, description },
  } = postContent

  const props = {
    frontMatter: {
      title,
      description,
    },
    source: await serialize(markdownBody),
  }

  return {
    props,
  }
}

export default About
