import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'
import { H5 } from '@/components/Headings'
import { Paragraph } from '@/components/Paragraph'

import { UsesType } from '@/types'

type ProjectCardProps = {
  tool: any
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ tool }) => {
  const { lang } = useTranslation('common')

  return (
    <article className="flex flex-row relative gap-x-5">
      {tool.image ? (
        <div className="min-w-[5rem]">
          <Image
            alt={`Thumbnail of ${tool.title}`}
            src={tool.image}
            width="75"
            height="75"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      ) : null}
      <div>
        <H5 as="h3" className="mb-2">
          <CustomLink
            href={tool.url}
            className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 font-medium dark:!text-white"
          >
            {tool.title}
          </CustomLink>
        </H5>
        <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium dark:text-white ring-1 ring-inset ring-gray-400 dark:ring-gray-700">
          <svg className="h-1.5 w-1.5 fill-blue-400" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" />
          </svg>
          {tool.status}
        </span>
        <Paragraph>{tool[`description_${lang}` as keyof UsesType]}</Paragraph>
      </div>
    </article>
  )
}
