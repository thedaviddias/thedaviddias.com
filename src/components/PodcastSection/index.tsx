import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import { CustomLink } from '@/components/CustomLink'
import { H5 } from '@/components/Headings'

import { PodcastsResponse } from '@/pages/api/spotify/podcasts'
import fetcher from '@/utils/fetcher'

const PodcastSection = () => {
  const { t, lang } = useTranslation('common')
  const { theme, resolvedTheme } = useTheme()
  const { data } = useSWR<PodcastsResponse>(`/api/spotify/podcasts?lang=${lang}`, fetcher)

  return (
    <section className="grid grid-cols-1 gap-y-10 border-none">
      <header>
        <H5 as="h2">{t('home.sections.podcast.latest_podcasts')}</H5>
      </header>
      {data?.podcast ? (
        <>
          {data?.podcast && (
            <>
              <iframe
                src={`${data.podcast}?utm_source=generator${
                  theme === 'dark' || resolvedTheme === 'dark' ? `&theme=0` : ''
                }`}
                className="rounded-xl"
                width="100%"
                height="232"
                frameBorder="0"
                allow="encrypted-media"
                title="Spotify player for the podcast World Web Stories"
              ></iframe>
              <footer className="text-right">
                <CustomLink href={t('home.sections.podcast.url')} className="dark:!text-white">
                  {t('home.sections.podcast.view_website')}
                </CustomLink>
              </footer>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </section>
  )
}

export default PodcastSection
