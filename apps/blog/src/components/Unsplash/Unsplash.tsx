import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
import { MetricsCard } from '../MetricsCard'

export type UnsplashRes = {
  downloads: number
  views: number
}

export const Unsplash = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<UnsplashRes>('/api/unsplash', fetcher)

  const downloads = data?.downloads
  const views = data?.views
  const link = t('dashboard.sections.photos.url')

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard
        header={t('dashboard.sections.photos.downloads')}
        link={link}
        metric={downloads}
      />
      <MetricsCard header={t('dashboard.sections.photos.views')} link={link} metric={views} />
    </div>
  )
}
