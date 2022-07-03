import useTranslation from 'next-translate/useTranslation'
import prettyMilliseconds from 'pretty-ms'
import useSWR from 'swr'

import { Loader } from '@/components/Loader'
import { MetricsCard } from '@/components/MetricsCard'

import fetcher from '@/utils/fetcher'

type SteamRes = {
  count: number
  recently: {
    appid: number
    name: string
    playtime_2weeks: number
    playtime_forever: number
    img_icon_url: string
    playtime_windows_forever: number
    playtime_mac_forever: number
    playtime_linux_forever: number
  }
}

export const SteamCard = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<SteamRes>('/api/steam', fetcher)

  const count = data?.count
  const recently = data?.recently
  const playtime = recently?.playtime_2weeks as number

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      {count && <MetricsCard header={t('dashboard.sections.gaming.total_number')} metric={count} />}
      {playtime && (
        <MetricsCard
          header={t('dashboard.sections.gaming.most_played', { name: recently?.name })}
          link={`https://store.steampowered.com/app/${recently?.appid}`}
          side={t('dashboard.sections.gaming.most_played_duration')}
          stat={prettyMilliseconds(playtime * 60000)}
        />
      )}
    </div>
  )
}
