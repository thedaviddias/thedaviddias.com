import { Feed } from 'feed'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { renderToStaticMarkup } from 'react-dom/server'
import rehypeImagePlaceholder from 'rehype-image-placeholder'

import { MDXComponents } from '@/components/MdxComponents'

import { BASE_URL } from '@/constants'
import { getAllPostsWithFrontMatter } from '@/utils/get-article-posts/getAllPostsWithFrontMatter'

import localeEN from '../../locales/en/common.json'
import localeFR from '../../locales/fr/common.json'

export default async function generateRssFeed() {
  const notesEn = getAllPostsWithFrontMatter({ dataType: 'notes' })
  const articlesEn = getAllPostsWithFrontMatter({ dataType: 'articles' })

  const postsEn = [...notesEn, ...articlesEn]

  const articlesFR = getAllPostsWithFrontMatter({ dataType: 'articles', locale: 'fr' })
  const notesFr = getAllPostsWithFrontMatter({ dataType: 'notes', locale: 'fr' })

  const postsFr = [...articlesFR, ...notesFr]

  const siteURL = BASE_URL
  const date = new Date()
  const author = {
    name: 'David Dias',
    email: 'thedaviddias@gmail.com',
    link: 'https://twitter.com/thedaviddias',
  }

  // Creating feed
  const feedEn = new Feed({
    title: localeEN.home.seo.title,
    description: localeEN.home.seo.description,
    id: siteURL,
    link: siteURL,
    language: 'en-US',
    image: `${siteURL}/favicons/android-chrome-144x144.png`,
    favicon: `${siteURL}/favicons/android-chrome-144x144.png`,
    copyright: `All rights reserved ${date.getFullYear()}, David Dias`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  })

  feedEn.addCategory('Technology')

  // Adding blogs to the rss feed
  for (const post of postsEn) {
    const url = `${siteURL}${post.permalink}`

    const { content } = post

    const source = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [[rehypeImagePlaceholder, { dir: 'public/' }]],
      },
    })

    const contentHtml = renderToStaticMarkup(<MDXRemote {...source} components={MDXComponents} />)

    feedEn.addItem({
      title: post.frontMatter.title,
      id: url,
      link: url,
      description: post.frontMatter.description,
      content: contentHtml,
      author: [author],
      contributor: [author],
      date: new Date(post.frontMatter.date),
      ...(post.frontMatter.preview && { image: `${siteURL}${post.frontMatter.preview.url}` }),
    })
  }

  // generating the xml and json for rss
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feedEn.rss2())
  fs.writeFileSync('./public/rss/feed.json', feedEn.json1())

  // Creating feed
  const feedFr = new Feed({
    title: localeFR.home.seo.title,
    description: localeFR.home.seo.description,
    id: siteURL,
    link: siteURL,
    language: 'fr',
    image: `${siteURL}/favicons/android-chrome-144x144.png`,
    favicon: `${siteURL}/favicons/android-chrome-144x144.png`,
    copyright: `Tous droits réservés ${date.getFullYear()}, David Dias`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/fr/feed.xml`,
      json: `${siteURL}/rss/fr/feed.json`,
    },
    author,
  })

  feedFr.addCategory('Technologie')

  // Adding blogs to the rss feed
  for (const post of postsFr) {
    const url = `${siteURL}${post.permalink}`

    const { content } = post

    const source = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [[rehypeImagePlaceholder, { dir: 'public/' }]],
      },
    })

    const contentHtml = renderToStaticMarkup(<MDXRemote {...source} components={MDXComponents} />)

    feedFr.addItem({
      title: post.frontMatter.title,
      id: url,
      link: url,
      description: post.frontMatter.description,
      content: contentHtml,
      author: [author],
      contributor: [author],
      date: new Date(post.frontMatter.date),
      ...(post.frontMatter.preview && { image: `${siteURL}${post.frontMatter.preview.url}` }),
    })
  }

  fs.mkdirSync('./public', { recursive: true })
  fs.writeFileSync('./public/rss/fr/feed.xml', feedFr.rss2())
  fs.writeFileSync('./public/rss/fr/feed.json', feedFr.json1())
}
