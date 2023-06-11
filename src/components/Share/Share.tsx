import { camelCase } from 'camel-case'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Facebook, Linkedin, Reddit, Twitter } from 'react-social-sharing'

export type ShareProps = {
  permalink: string
  title: string
}

export const Share: React.FC<ShareProps> = ({ permalink, title }) => {
  const { t } = useTranslation('common')

  return (
    <aside>
      <p className="small-title">{t('share.title')}</p>
      <Twitter small message={`${title} by @thedaviddias`} link={permalink} className="h-8 w-10" />
      <Facebook small link={permalink} className="h-8 w-10" />
      <Linkedin small message={title} link={permalink} className="h-8 w-10" />
      <Reddit small link={permalink} className="h-8 w-10" />
    </aside>
  )
}
