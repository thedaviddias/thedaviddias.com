import { camelCase } from 'camel-case'
import React, { FC } from 'react'
import { Facebook, Linkedin, Reddit, Twitter } from 'react-social-sharing'

type ShareProps = {
  slug: string
  title: string
  tags?: string[]
}

export const Share: FC<ShareProps> = ({ slug, title, tags }) => {
  const arr: string[] = []

  tags?.map((tag: string) => {
    arr.push(`#${camelCase(tag)}`)
  })

  const hashtags = arr.join(' ')

  return (
    <aside>
      <Twitter
        small
        message={`${title} ${hashtags} by @thedaviddias`}
        link={slug}
        className="h-8 w-10"
      />
      <Facebook small link={slug} className="h-8 w-10" />
      <Linkedin small message={title} link={slug} className="h-8 w-10" />
      <Reddit small link={slug} className="h-8 w-10" />
    </aside>
  )
}
