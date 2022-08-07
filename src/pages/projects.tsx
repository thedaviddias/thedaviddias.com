import { GetStaticProps } from 'next'

import { fetchRepos } from '@/lib/github'

import { Container } from '@/components/Container'
import { GithubProject } from '@/components/GithubProject'
import { H2 } from '@/components/Headings'
import { PageHeader } from '@/components/PageHeader'

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
  return (
    <Container>
      <PageHeader title="Projects" />

      <H2>Popular Github Projects</H2>
      <p>My most popular Github projects</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-3 max-w-5xl">
        {ghProjects.map((project, i) => (
          <GithubProject key={i} project={project} />
        ))}
      </div>
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
