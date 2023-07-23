import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'

type AdjacentPosts = {
  slug: string
  title: string
  image?: string
}

export type PreviousNext = {
  previous: AdjacentPosts | null
  next: AdjacentPosts | null
}

export type AdjacentPostsProps = {
  posts: PreviousNext
}

export const AdjacentPosts: React.FC<AdjacentPostsProps> = ({ posts }) => {
  const { t } = useTranslation('common')

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-300 pt-8">
      <nav aria-label="Adjacent posts">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-xl">
          <div className="nav-previous">
            {posts.previous && (
              <>
                <div className="small-title flex justify-start">{t('posts.previous')}</div>
                <CustomLink
                  href={posts.previous.slug}
                  className="flex flex-row-reverse text-gray-600 hover:text-gray-900 dark:text-gray-200 p-1"
                >
                  <div className="flex flex-col gap-3 justify-start">
                    {posts.previous.image ? (
                      <div className="relative flex justify-start">
                        <Image
                          src={posts.previous.image}
                          alt=""
                          width={200}
                          height={200}
                          className="aspect-video object-cover h-44 rounded-lg"
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="text-primary-500 leading-6">{posts.previous.title}</div>
                  </div>
                </CustomLink>
              </>
            )}
          </div>
          <div className="nav-next text-right">
            {posts.next && (
              <>
                <div className="small-title flex justify-end">{t('posts.next')}</div>
                <CustomLink
                  href={posts.next.slug}
                  className="flex flex-row-reverse text-gray-600 hover:text-gray-900 dark:text-gray-200 p-1"
                >
                  <div className="flex flex-col gap-3 justify-end">
                    {posts.next.image ? (
                      <div className="relative flex justify-end">
                        <Image
                          src={posts.next.image}
                          alt=""
                          width={200}
                          height={200}
                          className="aspect-video object-cover rounded-lg"
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="text-primary-500 leading-6">{posts.next.title}</div>
                  </div>
                </CustomLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
