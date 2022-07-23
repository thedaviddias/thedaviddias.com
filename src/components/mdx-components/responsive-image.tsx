import Image from 'next/image'

export const ResponsiveImage = ({ src, alt = '', height, width, ...rest }) => {
  return (
    <div className="my-3">
      <Image
        layout="responsive"
        src={src}
        height={height}
        width={width}
        alt={alt}
        className="rounded-lg"
        {...rest}
      />
    </div>
  )
}
