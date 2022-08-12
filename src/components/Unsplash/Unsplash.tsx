import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
import { MetricsCard } from '../MetricsCard'

export type UnsplashRes = {
  downloads: number
  views: number
}

export const Unsplash = () => {
  const { data, error } = useSWR<UnsplashRes>('/api/unsplash', fetcher)

  const downloads = data?.downloads
  const views = data?.views
  const link = 'https://unsplash.com/@thedaviddias'

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard header="Unsplash Downloads" link={link} metric={downloads} />
      <MetricsCard header="Unsplash Views" link={link} metric={views} />
    </div>
  )
}
