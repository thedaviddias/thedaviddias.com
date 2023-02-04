import Image from "next/legacy/image";
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'

import { RoutesResponse } from '@/config/routes'

type AuthorProps = {
  name: string
  routes: RoutesResponse
}

export const Author: React.FC<AuthorProps> = ({ name, routes }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-center justify-center font-sans">
      <div className="flex-shrink-0 group block">
        <CustomLink href={routes(t).about.path}>
          <div className="flex items-center">
            <div>
              <Image
                className="inline-block rounded-full h-auto max-w-xl"
                src="/images/david-dias-round.png"
                width={40}
                height={40}
                alt="Profile avatar of David Dias"
                aria-hidden="true"
                priority={true}
              />
            </div>
            <div className="ml-3 text-left">
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-400">
                {name}
              </p>
              <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-400">
                {routes(t).about.seo.title}
              </p>
            </div>
          </div>
        </CustomLink>
      </div>
    </div>
  )
}
