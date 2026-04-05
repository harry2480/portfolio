import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/content'

export async function GET() {
  const posts = await getAllPosts()
  const payload = posts.map((p, i) => ({
    id: i + 1,
    slug: p.slug,
    date: p.date,
    title: p.title,
    excerpt: p.description || '',
    tags: p.tags || [],
    content: p.content,
  }))

  return NextResponse.json(payload)
}
