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
    <>
      <Image
        alt={alt}
        className="rounded-lg"
        layout="responsive"
        loading="lazy"
        quality={80}
        src={src}
        height={height}
        width={width}
        placeholder="blur"
        {...rest}
      />
      {title && (
        <figcaption
          className="z-10 mt-4 text-sm italic text-gray-600 text-center dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
    </>
  )
}
