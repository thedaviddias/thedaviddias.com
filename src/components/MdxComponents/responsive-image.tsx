import Image, { ImageProps } from 'next/image'

import { CustomLink } from '../CustomLink'

export const ResponsiveImage: React.FC<ImageProps> = ({
  src,
  title,
  alt = '',
  height,
  width,
  ...rest
}) => {
  return (
    <div className="my-3">
      <CustomLink href={src as string} aria-label="Click to enlarge the image">
        <Image
          alt={alt}
          className="rounded-lg"
          loading="lazy"
          quality={80}
          src={src}
          height={height}
          width={width}
          placeholder="blur"
          {...rest}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </CustomLink>
      {title && (
        <figcaption className="z-10 mt-4 text-sm italic text-gray-600 text-center dark:text-gray-300">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </figcaption>
      )}
    </div>
  )
}
