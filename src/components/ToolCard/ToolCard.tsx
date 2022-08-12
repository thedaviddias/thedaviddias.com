import Image from 'next/future/image'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'
import { H5 } from '@/components/Headings'
import { Paragraph } from '@/components/Paragraph'

import { Tool } from '@/pages/uses'

type ToolCard = {
  tool: Tool
}

export const ToolCard: React.FC<ToolCard> = ({ tool }) => {
  const { lang } = useTranslation('common')

  return (
    <article className="flex flex-row relative gap-x-5">
      <div className="min-w-[5rem]">
        <Image alt={`Thumbnail of ${tool.title}`} src={tool.image} width="75" height="75" />
      </div>
      <div>
        <H5 as="h3">
          <CustomLink
            href={tool.url}
            className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 font-medium dark:!text-white"
          >
            {tool.title}
          </CustomLink>
        </H5>
        <Paragraph>{tool[`description_${lang}` as keyof Tool]}</Paragraph>
      </div>
    </article>
  )
}
