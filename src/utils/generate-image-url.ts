import { CLOUDINARY_IMG_HEIGHT, CLOUDINARY_IMG_WIDTH, CLOUDINARY_NAME } from '@/constants'

/* Encode characters for Cloudinary URL */
const cleanText = (text: string) => {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1')
}

type GenerateImageUrlProps = {
  title: string
  imagePublicID?: string
  subfolder?: string
  cloudinaryUrlBase?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  nameFont?: string
  nameGravity?: string
  nameBottomOffset?: number
  nameLeftOffset?: number
  nameColor?: string
  nameFontSize?: number
  version?: number | null
}

export const generateImageUrl = ({
  title,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  imagePublicID = 'social-card-template.jpg',
  subfolder = 'thedaviddias.dev',
  imageWidth = CLOUDINARY_IMG_WIDTH,
  imageHeight = CLOUDINARY_IMG_HEIGHT,
  textAreaWidth = 1600,

  nameFont = 'Oswald',
  nameBottomOffset = -200,
  nameLeftOffset = 0,
  nameColor = 'ffffff',
  nameFontSize = 110,

  version = null,
}: GenerateImageUrlProps) => {
  // configure social media image dimensions, quality, and format
  const imageConfig = [`w_${imageWidth}`, `h_${imageHeight}`, 'c_fill', 'q_auto', 'f_auto'].join(
    ','
  )

  // configure the name text
  const nameConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${nameColor}`,
    `x_${nameLeftOffset}`,
    `y_${nameBottomOffset}`,
    `l_text:${nameFont}_${nameFontSize}:${cleanText(title)}`,
  ].join(',')

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    CLOUDINARY_NAME,
    'image',
    'upload',
    version,
    imageConfig,
    nameConfig,
    subfolder,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return validParts.join('/')
}
