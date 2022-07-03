import useSWR from 'swr'

import { Loader } from '@/components/Loader'

import { ViewsHandlerRes } from '@/pages/api/plausible/[slug]'
import fetcher from '@/utils/fetcher'

type DisplayViewsProps = {
  slug: string
}

export const DisplayViews: React.FC<DisplayViewsProps> = ({ slug }) => {
  const { data, error } = useSWR<ViewsHandlerRes>(`/api/plausible/${slug}`, fetcher)

  const views = data?.views

  if (!data && !error) return <Loader />

  return (
    <>
      {views ? (
        <div className="flex items-center">
          <span className="tabular-nums">{views > 0 ? views : 'No'} views</span>
        </div>
      ) : null}
    </>
  )
}
