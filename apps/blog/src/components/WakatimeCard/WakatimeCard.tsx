import { formatDistance } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
import { MetricsCard } from '../MetricsCard'

const duration = (s?: number) =>
  s ? formatDistance(0, s * 1000, { includeSeconds: true }) : 'No information'

export type WakatimeRes = {
  daily_average: number
  total_seconds: number
}

export const WakatimeCard = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<WakatimeRes>('/api/wakatime', fetcher)

  const daily_average = data?.daily_average
  const total_seconds = data?.total_seconds
  const link = t('dashboard.sections.coding.url')

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricsCard
        header={t('dashboard.sections.coding.average_activity')}
        side={t('dashboard.sections.coding.average_activity_duration')}
        link={link}
        stat={duration(daily_average)}
      />
      <MetricsCard
        header={t('dashboard.sections.coding.total_time')}
        side={t('dashboard.sections.coding.total_time_duration')}
        link={link}
        stat={duration(total_seconds)}
      />
    </div>
  )
}
