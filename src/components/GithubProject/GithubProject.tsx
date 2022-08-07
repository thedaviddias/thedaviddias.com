import { formatDistance } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'

import { GhProjectsProps } from '@/pages/projects'
import { convertLangDateFs } from '@/utils/language-date'

import { H5 } from '../Headings'
import GithubFork from '../../../public/images/svg/github-fork.svg'
import GithubStar from '../../../public/images/svg/github-star.svg'

export type GithubProjectProps = {
  project: GhProjectsProps
}

export const GithubProject: FC<GithubProjectProps> = ({ project }) => {
  const { t, lang } = useTranslation('common')

  return (
    <article className="flex flex-col border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-4 h-full border">
      <H5 as="h3">
        <CustomLink href={project.url} className="dark:text-blue-300 font-semibold mb-3">
          {project.name}
        </CustomLink>
      </H5>

      <div className="mb-3">{project.description}</div>

      <div className="flex space-x-3">
        {project.language && (
          <div className="flex align-middle items-center">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: project.language?.color }}
            />
            <span className="ml-2">{project.language?.name}</span>
          </div>
        )}

        <div className="flex align-middle items-center">
          <GithubStar className="fill-current text-gray-600 dark:text-gray-100" />
          <span className="ml-2">{project?.stars}</span>
        </div>

        <div className="flex align-middle items-center">
          <GithubFork className="fill-current text-gray-600 dark:text-gray-100" />
          <span className="ml-2">{project?.forks}</span>
        </div>

        <div>
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
