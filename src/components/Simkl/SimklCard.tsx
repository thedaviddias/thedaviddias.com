import prettyMilliseconds from 'pretty-ms'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { MetricsCard } from '../MetricsCard'

type SimklRes = {
  stats: {
    total_mins: number
    watched_last_week: {
      total_mins: number
    }
  }
}

export const SimklCard = () => {
  const { data, error } = useSWR<SimklRes>('/api/simkl', fetcher)

  const spent_total_mins = data?.stats.total_mins || 1
  const watched_total_mins = data?.stats.watched_last_week.total_mins || 1
  const link = 'https://simkl.com/5311920'

  if (error) return <></>
  if (!data) return <div>Loading...</div>

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard
        header="Spent watching"
        side="(since forever)"
        link={link}
        stat={prettyMilliseconds(spent_total_mins * 60000)}
      />
      <MetricsCard
        header="Spent watching TV Shows"
        side="(last week)"
        link={link}
        stat={prettyMilliseconds(watched_total_mins * 60000)}
      />
    </div>
  )
}
