import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'
import { H5 } from '@/components/Headings'
import { Paragraph } from '@/components/Paragraph'

import { UsesType } from '@/types'

type ToolCard = {
  tool: UsesType
}

export const ToolCard: React.FC<ToolCard> = ({ tool }) => {
  const { lang } = useTranslation('common')

  return (
    <article className="relative flex flex-row gap-x-5">
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
        <H5 as="h3">
          <CustomLink
            href={tool.url}
            className="font-medium before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:content-[''] dark:!text-white"
          >
            {tool.title}
          </CustomLink>
        </H5>
        <Paragraph>{tool[`description_${lang}` as keyof UsesType]}</Paragraph>
      </div>
    </article>
  )
}
