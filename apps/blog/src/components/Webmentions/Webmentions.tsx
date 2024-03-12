import { formatDistance } from 'date-fns'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { WebMention } from '@/pages/articles/[slug]'
import { convertLangDateFs } from '@/utils/language-date'

import { CustomLink } from '../CustomLink'
import { H4 } from '../Headings'
import { Paragraph } from '../Paragraph'

export type WebMentionsProps = {
  mentions?: WebMention[]
}

export const Webmentions: React.FC<WebMentionsProps> = ({ mentions }) => {
  const { t, lang } = useTranslation('common')
  const [isMentionsVisible, setIsMentionsVisible] = useState(false)

  const showHide = isMentionsVisible ? t('webmentions.hide') : t('webmentions.show')

  return (
    <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-600">
      <header>
        <H4 as="h3">{t('webmentions.title')}</H4>
        <Paragraph>{t('webmentions.description')}</Paragraph>
      </header>

      {mentions?.length ? (
        <>
          <ul className="relative flex">
            {mentions?.map((mention, i) => (
              <li className={`flex flex-col ${i > 0 && '-ml-8'}`} key={i}>
                <CustomLink href={mention.data.url} className="mr-2" icon={false}>
                  <Image
                    src={mention.data.author.photo}
                    alt={mention.data.author.name}
                    width={53}
                    height={53}
                    className="rounded-full border"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </CustomLink>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {mentions?.length ? (
        <div>
          <button
            type="button"
            onClick={() => setIsMentionsVisible(!isMentionsVisible)}
            className="mb-3 mt-10 rounded bg-indigo-500 px-3 py-1 font-bold text-white dark:bg-indigo-900"
          >
            {t('webmentions.details', { show: showHide })}
          </button>

          {isMentionsVisible &&
            mentions?.map((mention, i) => (
              <div key={i} className="mb-5">
                <div className="grid grid-cols-8 items-center gap-3 rounded-lg bg-slate-100 p-5 transition-all dark:bg-slate-800">
                  <CustomLink
                    href={mention.data.author.url}
                    className="col-span-1 mr-2"
                    icon={false}
                  >
                    <Image
                      src={mention.data.author.photo}
                      alt={mention.data.author.name}
                      width={45}
                      height={45}
                      className="rounded-full border"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </CustomLink>
                  <div className="col-span-7">
                    {mention.activity.type === 'reply' && (
                      <div className="font-semibold">
                        {mention.data.author.name}{' '}
                        <CustomLink
                          href={mention.data.url}
                          className="text-indigo-600 underline dark:text-indigo-400"
                        >
                          {t(`webmentions.activity.${mention.activity.type}`)}
                        </CustomLink>{' '}
                        {t('webmentions.activity_reply', {
                          date: formatDistance(new Date(mention.data.published), new Date(), {
                            locale: convertLangDateFs(lang),
                          }),
                        })}
                      </div>
                    )}
                    {(!mention.data.content || mention.activity.type === 'repost') && (
                      <p>
                        {mention.data.author.name}{' '}
                        <CustomLink
                          href={mention.data.url}
                          className="text-indigo-600 underline dark:text-indigo-400"
                        >
                          {t(`webmentions.activity.${mention.activity.type}`)}
                        </CustomLink>{' '}
                        {t('webmentions.activity_others')}
                      </p>
                    )}
                    {mention.data.content && mention.activity.type !== 'repost' && (
                      <p
                        className="pt-2"
                        dangerouslySetInnerHTML={{ __html: mention.data.content }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </section>
  )
}
