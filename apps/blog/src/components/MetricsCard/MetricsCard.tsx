import { CustomLink } from '../CustomLink'
import { H5 } from '../Headings'

type MetricsCardProps = {
  link?: string
  metric?: number
  header: string
  stat?: string
  isCurrency?: boolean
  side?: string
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  header,
  link,
  metric,
  stat,
  side,
  isCurrency = false,
}) => {
  return (
    <article className="relative flex h-full flex-col rounded-md border border-gray-300 p-4 text-gray-800 dark:border-gray-700 dark:text-gray-200">
      <H5 as="h3">
        {link ? (
          <CustomLink href={link} className="font-semibold dark:text-blue-300">
            {header}
          </CustomLink>
        ) : (
          <span className="mb-3 font-semibold">{header}</span>
        )}
        {side && <div className="absolute bottom-2 right-2 text-sm">{side}</div>}
      </H5>
      <p className="spacing-sm mt-2 text-2xl font-bold text-black dark:text-white">
        {metric && metric > 0 && isCurrency
          ? metric.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          : ''}
        {metric && metric > 0 && !isCurrency ? metric.toLocaleString() : ''}
        {stat && stat ? stat : ''}
      </p>
    </article>
  )
}
