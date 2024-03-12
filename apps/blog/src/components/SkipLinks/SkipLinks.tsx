import useTranslation from 'next-translate/useTranslation'

import useSkipLinks, { SkipLinksProps } from '@/hooks/useSkipLinks'

type SkipContentProps = {
  link: SkipLinksProps
  className: string
}

const SkipContent: React.FC<SkipContentProps> = ({ link, className }) => {
  const { t } = useTranslation('common')
  return (
    <a href={`#${link.id}`} className={className}>
      {t('layout.a11y.skipContent', { label: link.title })}
    </a>
  )
}

export const SkipLinks = () => {
  const { skipLinks } = useSkipLinks()

  return (
    <nav aria-label="Skip navigation">
      {skipLinks.length > 1 ? (
        <ul>
          {skipLinks.map((link) => (
            <li key={link.title}>
              <SkipContent
                link={link}
                className="bg-primary text-primary-content absolute left-0 z-20 m-3 -translate-y-16 bg-slate-100 p-3 transition focus:translate-y-0 dark:bg-slate-900"
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          {skipLinks.map((link) => (
            <SkipContent
              key={link.title}
              link={link}
              className="bg-primary text-primary-content absolute left-0 z-20 m-3 -translate-y-16 bg-slate-100 p-3 transition focus:translate-y-0 dark:bg-slate-900"
            />
          ))}
        </>
      )}
    </nav>
  )
}
