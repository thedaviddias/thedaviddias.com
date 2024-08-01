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
    <section className="mb-5 border-none md:mb-10">
      <div className="grid grid-cols-1">
        <header className="mb-5">
          <H5 as="h2">{t('articles.sections.latest-posts')}</H5>
          <p className="text-s pt-3 dark:text-gray-400">{t('articles.seo.description')}</p>
        </header>
        <div className="grid grid-cols-1 lg:col-span-2">
          {articles.map((article, index) => (
            <BlogPost key={article.frontMatter.title} post={article} index={index} />
          ))}
        </div>
        <footer className="text-right">
          <CustomLink href="/articles">{t('articles.sections.viewAll')}</CustomLink>
        </footer>
      </div>
    </section>
  )
}
