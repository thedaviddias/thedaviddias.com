import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'

import { fetchRepos, GhProjectsProps } from '@/lib/github'

import { Container } from '@/components/Container'
import { GithubProject } from '@/components/GithubProject'
import { H2 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'
import { Projects } from '@/components/Projects'

import { routes } from '@/config/routes'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'

import { ProjectsType } from '@/types'

interface ProjectPageProps {
  ghProjects: GhProjectsProps[]
  projects: ProjectsType[]
}

const ProjectPage: React.FC<ProjectPageProps> = ({ ghProjects, projects }) => {
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
        <H2>{t('openProjects.sections.popular')}</H2>
        <p>{t('openProjects.sections.popular_description')}</p>
        <div className="my-3 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          {ghProjects.map((project, i) => (
            <GithubProject key={i} project={project} />
          ))}
        </div>

        <H2 className="mb-5">{t('projects.sections.popular')}</H2>

        {projects?.map((project, i) => (
          <Projects key={i} project={project} />
        ))}
      </main>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ locale }) => {
  const ghProjects = await fetchRepos('STARGAZERS', 4)
  const projects = await getAllPostsWithFrontMatter({ dataType: 'projects', locale, limit: 6 })

  return {
    props: {
      ghProjects,
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 1200, // 20 min
  }
}

export default ProjectPage
