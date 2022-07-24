import { TwitterEmbed, TwitterEmbedProps } from 'react-social-media-embed'

export const Tweet = (props: TwitterEmbedProps) => {
  return (
    <div className="mb-2">
      <TwitterEmbed {...props} />
    </div>
  )
}
