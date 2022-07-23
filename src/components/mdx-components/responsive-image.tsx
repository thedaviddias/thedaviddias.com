import Image from 'next/image'

export const ResponsiveImage = ({ src, title, alt = '', height, width, ...rest }) => {
  return (
    <figure className="my-3">
      <Image
        layout="responsive"
        src={src}
        height={height}
        width={width}
        alt={alt}
        className="rounded-lg"
        {...rest}
      />
      <figcaption className="z-10 mt-4 text-sm italic text-gray-600 text-center">
        {title}
      </figcaption>
    </figure>
  )
}
