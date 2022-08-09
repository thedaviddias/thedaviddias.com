import { formatDistance } from 'date-fns'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { MetricsCard } from '../MetricsCard'

const duration = (s?: number) =>
  s ? formatDistance(0, s * 1000, { includeSeconds: true }) : 'No information'

export type WakatimeRes = {
  daily_average: number
  total_seconds: number
}

export const WakatimeCard = () => {
  const { data, error } = useSWR<WakatimeRes>('/api/wakatime', fetcher)

  const daily_average = data?.daily_average
  const total_seconds = data?.total_seconds
  const link = 'https://wakatime.com/@thedaviddias'

  if (error) return <></>
  if (!data) return <div>Loading...</div>

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard
        header="Average coding activity per day"
        side="(last 7 days)"
        link={link}
        stat={duration(daily_average)}
      />
      <MetricsCard
        header="Total coding time"
        side="(last 7 days)"
        link={link}
        stat={duration(total_seconds)}
      />
    </div>
  )
}
