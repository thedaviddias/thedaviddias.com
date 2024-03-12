import { H1 } from '@/components/Headings'

type HeaderPageProps = {
  title?: string
  description?: string
  className?: string
}

export const PageHeader = ({ title, description, className }: HeaderPageProps) => {
  return (
    <header className={`mb-5 ${className}`}>
      {title && <H1>{title}</H1>}
      {description && (
        <p
          className="mt-6 text-base text-gray-500 sm:text-lg dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </header>
  )
}
