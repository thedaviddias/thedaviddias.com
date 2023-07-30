import Image from 'next/image'

import { CustomLink } from '@/components/CustomLink'

import { Paragraph } from '../Paragraph'

import { SupportersType } from '@/types'

type SupporterCardProps = {
  supporter: SupportersType
}

export const SupporterCard: React.FC<SupporterCardProps> = ({ supporter }) => {
  return (
    <li className="flex flex-row relative gap-x-5">
      {supporter.image || supporter.username ? (
        <div className="min-w-[3rem]">
          <Image
            className="rounded-xl"
            alt={`Thumbnail of ${supporter.name}`}
            src={supporter.image ? supporter.image : `https://github.com/${supporter.username}.png`}
            width="50"
            height="50"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      ) : null}
      <div>
        {supporter.url ? (
          <>
            <CustomLink
              href={supporter.url}
              className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 font-base dark:!text-white text-xl"
            >
              {supporter.name}
            </CustomLink>
            <Paragraph className="!my-0 text-sm capitalize">{supporter.type}</Paragraph>
          </>
        ) : (
          <div>
            <span className="font-base dark:!text-white">{supporter.name}</span>
            <Paragraph className="!my-0 text-sm capitalize">{supporter.type}</Paragraph>
          </div>
        )}
      </div>
    </li>
  )
}
