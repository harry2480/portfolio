import { NextResponse } from 'next/server'
import { getAllPosts, getPostTranslations } from '@/lib/content'
import type { Locale } from '@/i18n/config'

export async function GET() {
  try {
    const posts = getAllPosts()
    const payload = posts.map((p, i) => {
      const localized: Partial<Record<Locale, { title: string; excerpt: string }>> = {}
      for (const { post, locales } of getPostTranslations(p.slug)) {
        for (const locale of locales) {
          localized[locale] = { title: post.title, excerpt: post.description || '' }
        }
      }

      return {
        id: i + 1,
        slug: p.slug,
        date: p.date,
        title: p.title,
        excerpt: p.description || '',
        tags: p.tags || [],
        localized,
      }
    })

    return NextResponse.json(payload)
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    return NextResponse.json([], { status: 200 })
  }
}
