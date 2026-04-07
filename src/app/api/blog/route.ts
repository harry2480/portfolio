import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/content'

export async function GET() {
  try {
    const posts = getAllPosts()
    const payload = posts.map((p, i) => ({
      id: i + 1,
      slug: p.slug,
      date: p.date,
      title: p.title,
      excerpt: p.description || '',
      tags: p.tags || [],
    }))

    return NextResponse.json(payload)
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    return NextResponse.json([], { status: 200 })
  }
}
