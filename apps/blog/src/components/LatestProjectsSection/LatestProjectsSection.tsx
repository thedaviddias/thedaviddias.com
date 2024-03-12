import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'
import { Projects } from '../Projects'

export type LatestProjectsSectionProps = {
  projects: any[]
}

export const LatestProjectsSection: React.FC<LatestProjectsSectionProps> = ({ projects }) => {
  const { t } = useTranslation('common')

  return (
    <section className="mb-5 border-none md:mb-10">
      <header className="mb-5">
        <H5 as="h2">{t('projects.sections.latest-projects')}</H5>
        <p className="text-s pt-3 dark:text-gray-400">{t('projects.seo.description')}</p>
      </header>

      <div className="flex flex-col gap-3">
        {projects?.map((project, i) => (
          <Projects key={i} project={project} />
        ))}
      </div>

      {projects.length ? (
        <footer className="mt-5 text-right">
          <CustomLink href="/projects">{t('projects.sections.viewAll')}</CustomLink>
        </footer>
      ) : null}
    </section>
  )
}
