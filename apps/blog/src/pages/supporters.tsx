import { GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import useTranslation from 'next-translate/useTranslation'

import { H2 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'
import { SupporterCard } from '@/components/SupporterCard'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getPostBySlug } from '@/utils/get-article-posts/getPostBySlug'
import { readData } from '@/utils/read-data'

import { SupportersType, UsesType } from '@/types'

const categoryDescriptions: { [key: string]: { [key: string]: string } } = {
  en: {
    'Current supporters': 'These are the individuals currently supporting me.',
    'Previous supporters':
      'These are the people who have supported me in the past and for whom I will be eternally grateful.',
  },
  fr: {
    'Contributeurs actuels': 'Voici les personnes qui me soutiennent actuellement.',
    'Contributeurs précédents':
      "Ce sont les personnes qui m'ont soutenu par le passé et à qui je serai éternellement reconnaissant.",
  },
}

type SupportersProps = {
  categories: string[]
  supporters: SupportersType[]
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const Supporters: NextPage<SupportersProps> = ({ supporters, frontMatter, source }) => {
  const { t, lang } = useTranslation('common')
  const { title, description } = frontMatter

  const titlePage = title
  const descriptionPage = description

  const categoryDescriptionsForLocale = categoryDescriptions[lang]
  const categoryOrder = Object.keys(categoryDescriptionsForLocale)

  return (
    <BaseLayout
      title={titlePage}
      description={descriptionPage}
      noindex={true}
      openGraph={routes(t).about.seo}
      languageAlternates={[
        {
          hrefLang: 'en',
          href: 'https://thedaviddias.com/supporters',
        },
        {
          hrefLang: 'fr',
          href: 'https://thedaviddias.com/fr/suporteurs',
        },
      ]}
      className="border-none pt-10"
    >
      <div>
        <PageHeader title={titlePage} description={descriptionPage} />

        <MDXRemote {...source} components={MDXComponents} lazy />

        {categoryOrder.map((category) => {
          const sortedSupporters =
            supporters[category]?.sort((a: SupportersType, b: SupportersType) =>
              a.name.localeCompare(b.name)
            ) || []

          return (
            <section key={category} className="mb-8 mt-5 flex flex-col">
              <header className="pb-5">
                <H2 as="h2">{category}</H2>
                <p>{categoryDescriptionsForLocale[category]}</p>
              </header>

              <ul className="flex flex-col gap-y-5">
                {sortedSupporters.map((supporter: SupportersType, i: number) => (
                  <SupporterCard key={i} supporter={supporter} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postContent = await getPostBySlug(
    locale === 'en' ? 'supporters' : 'contributeurs',
    'pages',
    locale
  )
  const supportersData = await readData<UsesType[]>('../../data/supporters.json')

  const {
    markdownBody,
    frontMatter: { title, description },
  } = postContent

  const supporters: { [key: string]: UsesType[] } = {}
  const category = `category_${locale}` as keyof UsesType

  supportersData?.forEach((supporter) => {
    if (!supporters[supporter[category]]) {
      supporters[supporter[category]] = []
    }

    supporters[supporter[category]] = [...supporters[supporter[category]], supporter]
  })

  const categories = Object.keys(supporters)

  const props = {
    frontMatter: {
      title,
      description,
    },
    source: await serialize(markdownBody),
    supporters,
    categories,
  }

  return {
    props,
  }
}

export default Supporters
