import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'

type AdjacentPosts = {
  slug: string
  title: string
}

export type PreviousNext = {
  previous: AdjacentPosts | null
  next: AdjacentPosts | null
}

type AdjacentPostsProps = {
  posts: PreviousNext
}

export const AdjacentPosts: FC<AdjacentPostsProps> = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-600 pt-8">
      <nav aria-label="Notes">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-xl">
          <div className="nav-previous">
            {posts.previous && (
              <>
                <p className="small-title">{t('posts.previous')}</p>
                <CustomLink
                  href={posts.previous.slug}
                  className="flex text-gray-600 hover:text-gray-900 p-1 dark:text-gray-200"
                >
                  <div className="mr-2">
                    <span className="text-base mb-2">←</span>
                    <span className="sr-only">{t('posts.previous')}:</span>
                  </div>
                  <span className="text-primary-500 leading-6">{posts.previous.title}</span>
                </CustomLink>
              </>
            )}
          </div>
          <div className="nav-next text-right">
            {posts.next && (
              <>
                <p className="small-title">{t('posts.next')}</p>
                <CustomLink
                  href={posts.next.slug}
                  className="flex flex-row-reverse text-gray-600 hover:text-gray-900 dark:text-gray-200 p-1"
                >
                  <div className="ml-2">
                    <span className="text-base mb-2">→</span>
                    <span className="sr-only">{t('posts.next')}:</span>
                  </div>
                  <span className="text-primary-500 leading-6">{posts.next.title}</span>
                </CustomLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
