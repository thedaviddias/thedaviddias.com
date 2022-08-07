import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { fetchRepos } from '@/lib/github'

import { Container } from '@/components/Container'
import { GithubProject } from '@/components/GithubProject'
import { H2 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'

import { routes } from '@/config/routes'

type Language = {
  color: string
  name: string
}

export type GhProjectsProps = {
  name: string
  url: string
  description: string
  updatedAt: string
  stars: number
  forks: number
  language: Language | null
}

interface ProjectPageProps {
  ghProjects: GhProjectsProps[]
}

const ProjectPage: React.FC<ProjectPageProps> = ({ ghProjects }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <NextSeo
        title={routes(t).projects.seo.title}
        description={routes(t).projects.seo.description}
        openGraph={routes(t).projects.seo}
      />
      <main className="mb-5 mt-5">
        <PageHeader
          title={routes(t).projects.seo.title}
          description={routes(t).projects.seo.description}
        />
        <H2>{t('projects.sections.popular')}</H2>
        <p>{t('projects.sections.popular_description')}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-3 max-w-5xl">
          {ghProjects.map((project, i) => (
            <GithubProject key={i} project={project} />
          ))}
        </div>
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<ProjectPageProps> = async () => {
  const ghProjects = await fetchRepos('STARGAZERS', 6)

  return {
    props: {
      ghProjects,
    },
    revalidate: 1200, // 20 min
  }
}

export default ProjectPage
