import Link from 'next/link'

import type { BlogPost as BlogPostTypes } from '@/types/blog-post'

export const BlogPost = ({ posts }: { posts: BlogPostTypes[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.title}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  )
}
