#!/usr/bin/env ts-node
/* eslint-disable no-console */
import dotenv from 'dotenv'
import fs from 'fs'
import matter from 'gray-matter'
import fetch from 'node-fetch'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.publish.local') })

export {}

const MEDIUM_USER_ID = process.env.MEDIUM_AUTHOR_ID

const generateBlog = (slug) => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'content', 'articles', `${slug}.mdx`),
    'utf8'
  )
  const { data, content } = matter(source.trim())
  const canonicalUrl =
    data.locale === 'en'
      ? `https://thedaviddias.dev/articles/${slug}`
      : `https://thedaviddias.dev/fr/articles/${slug}`

  return {
    ...data,
    canonicalUrl,
    content: replaceRelativePath(content),
  }
}

const replaceRelativePath = (content) => {
  const withoutRelativeImage = content.replace(
    /\]\(\/images(?!https?:\/\/)/gi,
    '](' + 'https://thedaviddias.dev/images'
  )
  return withoutRelativeImage.replace(/\]\((?!https?:\/\/)/gi, '](' + 'https://thedaviddias.dev');
}

;(async () => {
  if (process.argv.length !== 3) {
    console.log('Should only have 1 argument')
    process.exit(1)
  }
  const slug = process.argv[2]
  const exist = fs
    .readdirSync(path.join(process.cwd(), 'content', 'articles'), 'utf-8')
    .find((b) => b === `${slug}.mdx`)
  if (!exist) {
    console.log(`${slug} article does not exist`)
    process.exit(1)
  }
  const blog = generateBlog(slug)

  // Medium API
  fetch(`https://api.medium.com/v1/users/${MEDIUM_USER_ID}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MEDIUM_TOKEN}`,
    },
    body: JSON.stringify({
      title: blog.title,
      content: blog.content,
      // tags: blog.tags,
      canonicalUrl: blog.canonicalUrl,
      contentFormat: 'markdown',
      publishStatus: 'draft',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        data.errors.forEach((error) => console.log('Medium:', error.message))
      } else {
        console.log(
          'Medium: Success in publishing the draft article at https://medium.com/me/stories/drafts'
        )
      }
    })
    .catch((error) => console.log(error))

  // Dev.to API
  fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.DEV_TOKEN,
    },
    body: JSON.stringify({
      article: {
        title: blog.title,
        body_markdown: blog.content,
        description: blog.description,
        // tags: blog.tags,
        canonical_url: blog.canonicalUrl,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log('Dev.to:', data.error)
      } else {
        console.log('Dev.to: Success in publishing the draft article at https://dev.to/dashboard')
      }
    })
    .catch((error) => console.log(error))
})()
