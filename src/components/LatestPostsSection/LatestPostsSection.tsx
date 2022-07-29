import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { BlogPost } from '../BlogPost'
import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'

type LatestPostsSection = {
  posts: any[]
}

export const LatestPostsSection: FC<LatestPostsSection> = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <section className="grid grid-cols-1 gap-y-10 border-none">
      <header>
        <H5 as="h2">{t('blog.sections.latest-posts')}</H5>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {posts.map((post) => (
          <BlogPost key={post.frontMatter.title} post={post} />
        ))}
      </div>
      <footer className="text-right">
        <CustomLink href="/blog">{t('posts.viewAll')}</CustomLink>
      </footer>
    </section>
  )
}
