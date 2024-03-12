import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  LinkedinIcon,
  XIcon,
  RedditIcon,
  FacebookMessengerIcon,
} from 'react-share'

export type ShareProps = {
  permalink: string
  title: string
}

export const Share: React.FC<ShareProps> = ({ permalink, title }) => {
  const { t } = useTranslation('common')

  return (
    <aside>
      <p className="small-title">{t('share.title')}</p>
      <TwitterShareButton title={`${title} by @thedaviddias`} url={permalink} className="h-8 w-10">
        <XIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton title={title} url={permalink} className="h-8 w-10">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <RedditShareButton url={permalink} className="h-8 w-10">
        <RedditIcon size={32} round />
      </RedditShareButton>
      <FacebookShareButton url={permalink} className="h-8 w-10">
        <FacebookMessengerIcon size={32} round />
      </FacebookShareButton>
    </aside>
  )
}
