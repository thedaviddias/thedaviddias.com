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
    <section className="mt-10 border-t border-gray-200 dark:border-gray-600 pt-8">
      <header>
        <H4 as="h3">{t('comments.title')}</H4>
        <Paragraph>{t('comments.description')}</Paragraph>
      </header>
      {isDisplay ? (
        <Giscus
          repo="thedaviddias/thedaviddias.dev"
          repoId="R_kgDOI5zbNw"
          category="Comments"
          categoryId="DIC_kwDOI5zbN84CW5lY"
          mapping="title"
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
          className="mt-5 mb-3 bg-indigo-500 dark:bg-indigo-900 text-white font-bold py-1 px-3 rounded"
        >
          {t('comments.leave_comment')}
        </button>
      )}
    </section>
  )
}
