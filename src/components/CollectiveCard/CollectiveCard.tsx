import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import { Loader } from '../Loader'
import { MetricsCard } from '../MetricsCard'

type Projects = {
  slug: string
  currency: string
  image: string
  balance: number
  yearlyIncome: number
  backersCount: number
  contributorsCount: number
}

type CollectiveRes = {
  projects: Projects[]
}

export const CollectiveCard = () => {
  const { data, error } = useSWR<CollectiveRes>('/api/open-collective', fetcher)

  const frontendchecklist_balance = parseInt(`${data?.projects[0].balance}`.slice(0, -2))
  const htmlhint_balance = data?.projects[1].balance

  if (error) return <></>
  if (!data) return <Loader />

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <MetricsCard
        header="Front-End Checklist balance"
        link="https://opencollective.com/front-end-checklist"
        metric={frontendchecklist_balance}
        isCurrency={true}
      />
      <MetricsCard
        header="HTMLHint balance"
        link="https://opencollective.com/htmlhint"
        metric={htmlhint_balance}
        isCurrency={true}
      />
    </div>
  )
}
