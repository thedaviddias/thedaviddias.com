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
      <article className="relative border-t border-gray-200 pb-2 pt-2 dark:border-gray-700">
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
          <div className="w-full">
            <H4 as="h3">
              <CustomLink
                className="block tracking-tight dark:!text-gray-100"
                href={`/projects/${project.slug}`}
              >
                {project.frontMatter.title} ({project.frontMatter.projects_type})
              </CustomLink>
            </H4>
            <StatusIndicator status={project.frontMatter.status} />
            <Paragraph>{project.frontMatter.description}</Paragraph>
            {project.frontMatter.progress !== '100%' ? (
              <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="rounded-full bg-blue-700 p-0.5 text-center text-sm font-medium leading-none text-blue-100"
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
