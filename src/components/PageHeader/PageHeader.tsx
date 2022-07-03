import { H1 } from '@/components/Headings'

type HeaderPageProps = {
  title?: string
  description?: string
}

export const PageHeader = ({ title, description }: HeaderPageProps) => {
  return (
    <header>
      {title && <H1>{title}</H1>}
      {description && (
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-6">{description}</p>
      )}
    </header>
  )
}
