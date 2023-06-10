import useTranslation from 'next-translate/useTranslation'

import { BlogPost } from '../BlogPost'
import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'

import { ArticlesType } from '@/types'

type LatestPostsSection = {
  articles: ArticlesType[]
}

export const LatestPostsSection: React.FC<LatestPostsSection> = ({ articles }) => {
  const { t } = useTranslation('common')

  return (
    <section className="grid grid-cols-1 gap-y-10 border-none  mb-10">
      <header>
        <H5 as="h2">{t('articles.sections.latest-posts')}</H5>
      </header>
      <div className="grid grid-cols-1 lg:col-span-2">
        {articles.map((article) => (
          <BlogPost key={article.frontMatter.title} post={article} />
        ))}
      </div>
      <footer className="text-right">
        <CustomLink href="/articles">{t('articles.sections.viewAll')}</CustomLink>
      </footer>
    </section>
  )
}
