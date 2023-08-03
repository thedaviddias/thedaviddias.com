import { CustomLink } from '@/components/CustomLink'
import { H4 } from '@/components/Headings'
import { Paragraph } from '@/components/Paragraph'
import StatusIndicator from '@/components/ProjectsStatus/ProjectsStatus'

import { ProjectsType } from '@/types'

export type ProjectsProps = {
  project: ProjectsType
}

export const Projects: React.FC<ProjectsProps> = ({ project }) => {
  return (
    <>
      <article className="pt-2 pb-2 border-t border-gray-200 dark:border-gray-700 relative">
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5">
          <div className="w-full">
            <H4 as="h3">
              <CustomLink
                className="dark:!text-gray-100 block tracking-tight"
                href={`/projects/${project.slug}`}
              >
                {project.frontMatter.title} ({project.frontMatter.projects_type})
              </CustomLink>
            </H4>
            <StatusIndicator status={project.frontMatter.status} />
            <Paragraph>{project.frontMatter.description}</Paragraph>
            {project.frontMatter.progress !== '100%' ? (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-700 text-sm font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: project.frontMatter.progress }}
                >
                  {project.frontMatter.progress}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </>
  )
}
