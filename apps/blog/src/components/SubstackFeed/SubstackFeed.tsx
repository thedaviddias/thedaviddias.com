import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useCallback, useEffect } from 'react'

import { H5 } from '@/components/Headings'

export const SubstackFeed: FC = () => {
  const [feed, setFeed] = React.useState<any>(null)
  const { t } = useTranslation('common')

  const fetchFeed = useCallback(async () => {
    try {
      const res = await fetch('/api/substack-feed')
      const data = await res.json()
      setFeed(data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [])

  useEffect(() => {
    fetchFeed()
  }, [fetchFeed])

  return (
    <>
      {feed?.items.length ? (
        <section className="relative flex flex-col px-0 pt-0 pb-0 overflow-hidden mb-5 md:mb-10">
          <header className="mb-5">
            <H5 as="h2">{t('newsletter.sections.latest')}</H5>
            <p className="pt-3 text-s dark:text-gray-400">{t('newsletter.seo.description')}</p>
          </header>
          <ul>
            {feed?.items.map((item: any, index: any) => (
              <li
                className="relative overflow-hidden"
                key={index}
                style={{
                  height: '300px',
                  width: '300px',
                }}
              >
                <div className="absolute inset-0 flex flex-col">
                  <Image
                    src={item.enclosures[0].url}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    aria-hidden="true"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                  <div className="relative flex flex-col items-center justify-center w-full px-4 py-3 sm:justify-between">
                    <div className="items-center justify-center w-full sm:flex">
                      <div className="max-w-lg">
                        <a href={item.link}>
                          <header className="text-white text-2xl font-bold">{item.title}</header>
                          <p className="mb-4 font-medium text-white sm:mb-0 md:mb-0">
                            {item.description}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <footer className="mt-5 text-right">
            <a href="https://thedaviddias.substack.com/">{t('newsletter.sections.viewAll')}</a>
          </footer>
        </section>
      ) : null}
    </>
  )
}
