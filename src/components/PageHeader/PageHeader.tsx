import { H1 } from '@/components/Headings'

type HeaderPageProps = {
  title?: string
  description?: string
  className?: string
}

export const PageHeader = ({ title, description, className }: HeaderPageProps) => {
  return (
    <header className={`mb-8 ${className}`}>
      {title && <H1>{title}</H1>}
      {description && (
        <p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </header>
  )
}
