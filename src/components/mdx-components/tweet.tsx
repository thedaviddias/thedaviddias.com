import { TwitterEmbed } from 'react-social-media-embed'

export const Tweet = (props) => {
  return (
    <div className="mb-2">
      <TwitterEmbed {...props} />
    </div>
  )
}
