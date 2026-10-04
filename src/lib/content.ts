import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

export type Post = {
  slug: string
  title: string
  date?: string
  description?: string
  tags?: string[]
  content: string
}

// 日本語の原文は直下、翻訳は <locale>/<slug>.md に置く
const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

function postPath(slug: string, locale: Locale): string {
  return locale === defaultLocale
    ? path.join(postsDirectory, `${slug}.md`)
    : path.join(postsDirectory, locale, `${slug}.md`)
}

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

export function getPostBySlug(slug: string, locale: Locale = defaultLocale): Post {
  const fullPath = postPath(slug, locale)
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

export type PostTranslation = {
  post: Post
  // この本文を表示する言語（翻訳がない言語は日本語の原文を表示する）
  locales: Locale[]
}

export function getPostTranslations(slug: string): PostTranslation[] {
  const original: PostTranslation = { post: getPostBySlug(slug), locales: [defaultLocale] }
  const translations: PostTranslation[] = []

  for (const locale of locales) {
    if (locale === defaultLocale) continue
    if (fs.existsSync(postPath(slug, locale))) {
      translations.push({ post: getPostBySlug(slug, locale), locales: [locale] })
    } else {
      original.locales.push(locale)
    }
  }

  return [original, ...translations]
}
