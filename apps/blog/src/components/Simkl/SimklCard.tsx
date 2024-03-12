import useTranslation from 'next-translate/useTranslation'
import prettyMilliseconds from 'pretty-ms'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
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
  const { t } = useTranslation('common')
  const { data, error } = useSWR<SimklRes>('/api/simkl', fetcher)

  const spent_total_mins = data?.stats.total_mins || 1
  const watched_total_mins = data?.stats.watched_last_week.total_mins || 1
  const link = t('dashboard.sections.tv.url')

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricsCard
        header={t('dashboard.sections.tv.total_spent')}
        side={t('dashboard.sections.tv.total_spent_duration')}
        link={link}
        stat={prettyMilliseconds(spent_total_mins * 60000)}
      />
      <MetricsCard
        header={t('dashboard.sections.tv.last_week_spent')}
        side={t('dashboard.sections.tv.last_week_spent_duration')}
        link={link}
        stat={prettyMilliseconds(watched_total_mins * 60000)}
      />
    </div>
  )
}
