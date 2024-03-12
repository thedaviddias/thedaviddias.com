import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { H4 } from '../Headings'
import { Paragraph } from '../Paragraph'

export const Comments = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const { t, lang } = useTranslation('common')
  return (
    <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-600">
      <header>
        <H4 as="h3">{t('comments.title')}</H4>
        <Paragraph>{t('comments.description')}</Paragraph>
      </header>
      {isDisplay ? (
        <Giscus
          repo="thedaviddias/thedaviddias.com"
          repoId="R_kgDOHmf8rQ"
          category="Announcements"
          categoryId="DIC_kwDOHmf8rc4CQc4s"
          mapping="og:title"
          reactionsEnabled="0"
          emitMetadata="0"
          theme={theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'}
          lang={lang}
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsDisplay(true)}
          className="mb-3 mt-5 rounded bg-indigo-500 px-3 py-1 font-bold text-white dark:bg-indigo-900"
        >
          {t('comments.leave_comment')}
        </button>
      )}
    </section>
  )
}
