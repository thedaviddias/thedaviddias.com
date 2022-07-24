import { H1 } from '@/components/heading'

type HeaderPageProps = {
  title: string
  description?: string
}

export const HeaderPage = ({ title, description }: HeaderPageProps) => {
  return (
    <header>
      <H1>{title}</H1>
      {description && (
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-2">{description}</p>
      )}
    </header>
  )
}
