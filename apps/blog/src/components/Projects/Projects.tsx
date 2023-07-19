import { ProjectCard } from '../ProjectCard'

export type ProjectsProps = {
  project: any
}

export const Projects: React.FC<ProjectsProps> = ({ project }) => {
  return <ProjectCard tool={project} />
}
