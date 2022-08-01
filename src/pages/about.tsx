import social from 'data/social.json'
import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { SocialProfileJsonLd } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getPostBySlug } from '@/utils/get-articles-posts'
import { listSocialUrl } from '@/utils/list-social-url'

type AboutProps = {
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const About: NextPage<AboutProps> = ({ frontMatter, source }) => {
  const { t } = useTranslation('common')

  const { title, description } = frontMatter

  return (
    <BaseLayout
      title={title}
      description={description}
      openGraph={routes(t).about.seo}
      className="pt-10 border-none"
    >
      <SocialProfileJsonLd
        type="Person"
        name="David Dias"
        url="https://thedavidias.dev"
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
