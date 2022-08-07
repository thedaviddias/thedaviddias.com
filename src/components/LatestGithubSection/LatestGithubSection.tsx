import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { GhProjectsProps } from '@/pages/projects'

import { CustomLink } from '../CustomLink'
import { GithubProject } from '../GithubProject'
import { H5 } from '../Headings'

export type LatestGithubSectionProps = {
  projects: GhProjectsProps[]
}

export const LatestGithubSection: FC<LatestGithubSectionProps> = ({ projects }) => {
  const { t } = useTranslation('common')

  return (
    <section className="border-none mb-10">
      <header>
        <H5 as="h2">{t('projects.sections.latest-projects')}</H5>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-3 max-w-5xl">
        {projects?.map((project, i) => (
          <GithubProject key={i} project={project} />
        ))}
      </div>
      {projects.length ? (
        <footer className="text-right">
          <CustomLink href="/projects">{t('projects.sections.viewAll')}</CustomLink>
        </footer>
      ) : null}
    </section>
  )
}
