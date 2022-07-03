import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { MetricsCard } from '../MetricsCard'

export type YouTube = {
  subscriberCount: number
  viewCount: number
}

export const YouTubeCard = () => {
  const { data } = useSWR<YouTube>('/api/youtube', fetcher)

  const subscriberCount = data?.subscriberCount
  const viewCount = data?.viewCount
  const link = 'https://www.youtube.com/channel/UCXYs_tVa-VFm5f6bWrPybhA'

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard header="YouTube Subscribers" link={link} metric={subscriberCount} />
      <MetricsCard header="YouTube Views" link={link} metric={viewCount} />
    </div>
  )
}
