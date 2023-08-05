import useTranslation from 'next-translate/useTranslation'
import useSWR from 'swr'

import { Loader } from '@/components/Loader'

import { TopPageHandlerRes } from '@/pages/api/plausible/top-pages'
import fetcher from '@/utils/fetcher'

import { CustomLink } from '../CustomLink'

export const Popular: React.FC = () => {
  const { t } = useTranslation('common')
  const { data, error } = useSWR<TopPageHandlerRes>(`/api/plausible/top-pages`, fetcher)

  const results = data?.results

  if (!data && !error) return <Loader />

  return (
    <>
      {results ? (
        <div className="mb-2 mt-10">
          <h3 className="small-title">{t('posts.popular')}</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="pb-3">
                <CustomLink href={result.page}>{result.title}</CustomLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
