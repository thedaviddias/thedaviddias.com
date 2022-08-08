import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'

import { H4 } from '../Headings'
import { Paragraph } from '../Paragraph'

export const Comments = () => {
  const { theme, resolvedTheme } = useTheme()
  const { t, lang } = useTranslation('common')
  return (
    <section className="mt-10 border-t border-gray-200 dark:border-gray-600 pt-8">
      <header>
        <H4 as="h2">{t('comments.title')}</H4>
        <Paragraph>{t('comments.description')}</Paragraph>
      </header>
      <Giscus
        repo="thedaviddias/thedaviddias.dev"
        repoId="R_kgDOHu_WAA"
        category="General"
        categoryId="DIC_kwDOHu_WAM4CQsGJ"
        mapping="title"
        reactionsEnabled="0"
        emitMetadata="0"
        theme={theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang={lang}
        loading="lazy"
      />
    </section>
  )
}
