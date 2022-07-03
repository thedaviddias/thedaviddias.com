import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '@/components/blog-post'
import { Container } from '@/components/container'

import { routes } from '@/config/routes'
import { getBlogsInformation } from '@/utils/get-blog-posts'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

type Props = {
  posts: BlogPostTypes[]
}

const Home: NextPage = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).home.seo.title}
        description={routes(t).home.seo.description}
        openGraph={routes(t).home.seo.openGraph}
      />

      <BlogPost posts={posts} />
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const posts = getBlogsInformation(6, locale)

  const props: Props = {
    posts,
  }

  return {
    props,
  }
}

export default Home
