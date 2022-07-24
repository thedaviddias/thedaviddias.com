import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

export const ResponsiveImage: FC<ImageProps> = ({
  src,
  title,
  alt = '',
  height,
  width,
  ...rest
}) => {
  return (
    <figure className="my-3">
      <Image
        alt={alt}
        className="rounded-lg"
        height={height}
        layout="responsive"
        loading="lazy"
        quality={90}
        src={src}
        width={width}
        {...rest}
      />
      <figcaption className="z-10 mt-4 text-sm italic text-gray-600 text-center">
        {title}
      </figcaption>
    </figure>
  )
}
