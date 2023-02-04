import Image from "next/legacy/image";
import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { CustomLink } from '../CustomLink'
import { H4, H5 } from '../Headings'
import { Loader } from '../Loader'

type LatestYoutubeVideosRes = {
  videos: {
    id: {
      videoId: string
    }
    snippet: {
      title: string
      thumbnails: {
        high: {
          url: string
          width: string
          height: string
        }
      }
    }
  }[]
}

const LatestYoutubeVideos = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<LatestYoutubeVideosRes>('/api/youtube/videos', fetcher, {
    revalidateOnFocus: false,
  })

  if (error) return <></>
  if (!data) return <Loader />

  const videos = data?.videos

  return (
    <section className="border-none mb-10">
      <header>
        <H5 as="h2">{t('youtube.sections.latest_videos')}</H5>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 my-3 max-w-5xl">
        {videos?.map((video, i) => (
          <div key={i} className="relative mt-3">
            <div className="mb-3">
              <Image
                src={video.snippet.thumbnails.high.url}
                alt=""
                width={video.snippet.thumbnails.high.width}
                height={video.snippet.thumbnails.high.height}
                className="aspect-video object-cover h-44 rounded-lg"
              />
            </div>
            <H4 as="h3">
              <CustomLink
                href={`https://youtube.com/watch?v=${video.id.videoId}`}
                className="dark:!text-white before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
              >
                {video.snippet.title}
              </CustomLink>
            </H4>
          </div>
        ))}
      </div>
      <footer className="text-right">
        <CustomLink href="https://www.youtube.com/c/TheDavidDias" className="dark:!text-white">
          {t('youtube.sections.viewAll')}
        </CustomLink>
      </footer>
    </section>
  )
}

export default LatestYoutubeVideos
