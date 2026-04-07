import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Post = {
  slug: string
  title: string
  date?: string
  description?: string
  tags?: string[]
  content: string
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  return slugs.map((slug) => getPostBySlug(slug))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`)
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post: Post = {
    slug,
    title: data.title || slug,
    date: data.date,
    description: data.excerpt || data.description || '',
    tags: data.tags || [],
    content,
  }

  return post
}
