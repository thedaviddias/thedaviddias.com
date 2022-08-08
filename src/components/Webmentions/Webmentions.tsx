import { formatDistance } from 'date-fns'
import Image from 'next/image'
import { FC, useState } from 'react'

import { WebMention } from '@/pages/articles/[slug]'

import { CustomLink } from '../CustomLink'
import { H4 } from '../Headings'
import { Paragraph } from '../Paragraph'

const activityMap = {
  link: 'linked to',
  reply: 'replied to',
  repost: 'retweeted',
  like: 'favourited',
}

type WebMentionsProps = {
  mentions?: WebMention[]
}

export const Webmentions: FC<WebMentionsProps> = ({ mentions }) => {
  const [isMentionsVisible, setIsMentionsVisible] = useState(false)

  return (
    <section className="mt-10 border-t border-gray-200 dark:border-gray-600 pt-8">
      <H4 as="h2">Webmentions</H4>
      <Paragraph>Tweet about this post and have it show up here!</Paragraph>

      {mentions?.length ? (
        <>
          <ul className="flex">
            {mentions?.map((mention, i) => (
              <li className={`flex flex-col ${i > 0 && '-ml-5'}`} key={i}>
                <CustomLink href={mention.data.url} className="mr-2" icon={false}>
                  <Image
                    src={mention.data.author.photo}
                    alt={mention.data.author.name}
                    width={53}
                    height={53}
                    className="rounded-full border w-4 h-4 absolute top-1 left-0 object-cover"
                  />
                </CustomLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsMentionsVisible(!isMentionsVisible)}
            className="mt-10 mb-3"
          >
            Show more mentions
          </button>
        </>
      ) : null}

      {isMentionsVisible &&
        mentions?.map((mention, i) => (
          <div
            className="grid grid-cols-8 gap-3 p-5 dark:bg-slate-800 rounded-lg items-center"
            key={i}
          >
            <CustomLink href={mention.data.author.url} className="mr-2 col-span-1" icon={false}>
              <Image
                src={mention.data.author.photo}
                alt={mention.data.author.name}
                width={45}
                height={45}
                className="rounded-full border w-4 h-4 absolute top-1 left-0 object-cover"
              />
            </CustomLink>
            <div className="col-span-7">
              {mention.activity.type === 'reply' && (
                <div className="font-semibold">
                  {mention.data.author.name}{' '}
                  <CustomLink href={mention.data.url}>
                    {activityMap[mention.activity.type]}
                  </CustomLink>{' '}
                  this post {formatDistance(new Date(mention.data.published), new Date())} ago:
                </div>
              )}
              {(!mention.data.content || mention.activity.type === 'repost') && (
                <p>
                  {mention.data.author.name}{' '}
                  <CustomLink href={mention.data.url}>
                    {activityMap[mention.activity.type]}
                  </CustomLink>{' '}
                  this post.
                </p>
              )}
              {mention.data.content && mention.activity.type !== 'repost' && (
                <p dangerouslySetInnerHTML={{ __html: mention.data.content }} />
              )}
            </div>
          </div>
        ))}
    </section>
  )
}
