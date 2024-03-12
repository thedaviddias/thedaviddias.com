import useTranslation from 'next-translate/useTranslation'

import { GhProjectsProps } from '@/lib/github'

import { CustomLink } from '../CustomLink'
import { GithubProject } from '../GithubProject'
import { H5 } from '../Headings'

export type LatestGithubSectionProps = {
  projects: GhProjectsProps[]
}

export const LatestGithubSection: React.FC<LatestGithubSectionProps> = ({ projects }) => {
  const { t } = useTranslation('common')

  return (
    <section className="mb-5 border-none md:mb-10">
      <header className="mb-5">
        <H5 as="h2">{t('openProjects.sections.latest-projects')}</H5>
        <p className="text-s pt-3 dark:text-gray-400">{t('openProjects.seo.description')}</p>
      </header>
      <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {projects?.map((project, i) => (
          <GithubProject key={i} project={project} />
        ))}
      </div>
      {projects.length ? (
        <footer className="mt-5 text-right">
          <CustomLink href="/projects">{t('openProjects.sections.viewAll')}</CustomLink>
        </footer>
      ) : null}
    </section>
  )
}
