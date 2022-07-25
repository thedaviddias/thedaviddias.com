import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

import { CustomLink } from '@/components/CustomLink'

type AuthorProps = {
  name: string
}

export const Author: FC<AuthorProps> = ({ name, routes }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center justify-center font-sans">
      <div className="flex-shrink-0 group block">
        <CustomLink href={routes(t).about.path}>
          <div className="flex items-center">
            <div>
              <Image
                className="inline-block rounded-full"
                src="/images/david-dias-round.png"
                width={40}
                height={40}
                alt="Profile avatar of David Dias"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-left">
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-400">
                {name}
              </p>
              <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-400">
                About me
              </p>
            </div>
          </div>
        </CustomLink>
      </div>
    </div>
  )
}
