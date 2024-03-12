import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import useTranslation from 'next-translate/useTranslation'

import { H3 } from '@/components/Headings'
import { MDXComponents } from '@/components/MdxComponents'
import { PageHeader } from '@/components/PageHeader'
import { ToolCard } from '@/components/ToolCard'

import { routes } from '@/config/routes'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getPostBySlug } from '@/utils/get-article-posts/getPostBySlug'
import { readData } from '@/utils/read-data'

import { UsesType } from '@/types'

type UsesProps = {
  categories: string[]
  tools: any[]
  frontMatter: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
}

const Uses: NextPage<UsesProps> = ({ categories, tools, frontMatter, source }) => {
  const { t } = useTranslation('common')
  const { title, description } = frontMatter

  const titlePage = title
  const descriptionPage = description

  return (
    <BaseLayout
      title={titlePage}
      description={descriptionPage}
      openGraph={routes(t).about.seo}
      languageAlternates={[
        {
          hrefLang: 'en',
          href: 'https://thedaviddias.com/uses',
        },
        {
          hrefLang: 'fr',
          href: 'https://thedaviddias.com/fr/utilise',
        },
      ]}
      className="border-none pt-10"
    >
      <PageHeader title={titlePage} description={descriptionPage} />

      <Image
        className="inline-block h-auto max-w-xl"
        src="/images/uses/desk-david-dias.jpg"
        width={960}
        height={540}
        alt="Photo of my desk setup with pink and warm yellow Philips Hue lights. My white desk is composed with 2 screens with a colorful screen background. Two white speakers in each side of the desk. A gray keyboard and a black mouse on a black pad. A microphone on a black arm attached to the right side of the desk."
        priority={true}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />

      <MDXRemote {...source} components={MDXComponents} lazy />

      {categories?.map((category) => (
        <section key={category} className="mb-8 mt-5 flex flex-col">
          <header className="pb-5">
            <H3 as="h2">{category}</H3>
          </header>

          <div className="flex flex-col gap-y-3">
            {tools[category as unknown as number].map((tool: UsesType, i: number) => (
              <ToolCard key={i} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </BaseLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postContent = await getPostBySlug(locale === 'en' ? 'uses' : 'utilise', 'pages', locale)
  const usesData = await readData<UsesType[]>('../../data/uses.json')

  const {
    markdownBody,
    frontMatter: { title, description },
  } = postContent

  const tools: { [key: string]: UsesType[] } = {}
  const category = `category_${locale}` as keyof UsesType

  usesData?.forEach((tool) => {
    if (!tools[tool[category]]) {
      tools[tool[category]] = []
    }

    tools[tool[category]] = [...tools[tool[category]], tool]
  })

  const categories = Object.keys(tools)

  const props = {
    frontMatter: {
      title,
      description,
    },
    source: await serialize(markdownBody),
    tools,
    categories,
  }

  return {
    props,
  }
}

export default Uses
