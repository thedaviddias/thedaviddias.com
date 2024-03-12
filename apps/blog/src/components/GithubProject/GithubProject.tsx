import { formatDistance } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'

import { GhProjectsProps } from '@/lib/github'

import { CustomLink } from '@/components/CustomLink'

import { convertLangDateFs } from '@/utils/language-date'

import { H5 } from '../Headings'
import GithubFork from '../../../public/images/svg/github-fork.svg'
import GithubStar from '../../../public/images/svg/github-star.svg'

export type GithubProjectProps = {
  project: GhProjectsProps
}

export const GithubProject: React.FC<GithubProjectProps> = ({ project }) => {
  const { t, lang } = useTranslation('common')

  return (
    <article className="flex h-full flex-col rounded-md border border-gray-300 p-4 text-gray-800 dark:border-gray-700 dark:text-gray-200">
      <H5 as="h3">
        <CustomLink href={project.url} className="mb-3 font-semibold dark:text-blue-300">
          {project.name}
        </CustomLink>
      </H5>

      <div className="mb-3">{project.description}</div>

      <div className="grid-col-4 mt-auto grid gap-y-1">
        {project.language && (
          <div className="col-span-1">
            <div className="flex items-center align-middle">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: project.language?.color || '' }}
              />
              <span className="ml-2">{project.language?.name}</span>
            </div>
          </div>
        )}

        <div
          className={`flex items-center align-middle ${
            project.language ? 'col-span-2' : 'col-span-1'
          }`}
        >
          <GithubStar className="fill-current text-gray-600 dark:text-gray-100" />
          <span className="ml-2">{project?.stars.toLocaleString()}</span>
        </div>

        <div
          className={`flex items-center align-middle ${
            project.language ? 'col-span-3' : 'col-span-2'
          }`}
        >
          <GithubFork className="fill-current text-gray-600 dark:text-gray-100" />
          <span className="ml-2">{project?.forks}</span>
        </div>

        <div className="col-span-4 grid-rows-2">
          {t('projects.updated', {
            date: formatDistance(new Date(project?.updatedAt), new Date(), {
              locale: convertLangDateFs(lang),
            }),
          })}
        </div>
      </div>
    </article>
  )
}
