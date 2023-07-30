import Image from 'next/image'

import { CustomLink } from '@/components/CustomLink'
import { H4 } from '@/components/Headings'

import { SupportersType } from '@/types'

type SupporterCardProps = {
  supporter: SupportersType
}

export const SupporterCard: React.FC<SupporterCardProps> = ({ supporter }) => {
  return (
    <article className="flex flex-row relative gap-x-5">
      {supporter.image ? (
        <div className="min-w-[5rem]">
          <Image
            alt={`Thumbnail of ${supporter.name}`}
            src={supporter.image}
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
        <H4 as="h3">
          {supporter.url ? (
            <CustomLink
              href={supporter.url}
              className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 font-base dark:!text-white"
            >
              {supporter.name}
            </CustomLink>
          ) : (
            <span className="font-base dark:!text-white">{supporter.name}</span>
          )}
        </H4>
      </div>
    </article>
  )
}
