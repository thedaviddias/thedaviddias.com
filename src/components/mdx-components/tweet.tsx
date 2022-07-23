import { useTheme } from 'next-themes'
import { TwitterEmbed } from 'react-social-media-embed'

export const Tweet = (props) => {
  const { resolvedTheme } = useTheme()

  return (
    <div className="mb-2">
      <TwitterEmbed {...props} />
    </div>
  )
}
