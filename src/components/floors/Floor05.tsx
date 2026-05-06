'use client'

import React, { useState, useEffect } from 'react'
import { navigateWithViewTransition } from '@/lib/viewTransition'

interface BlogPost {
  id: number
  slug: string
  date: string
  title: string
  excerpt: string
  tags: string[]
}

const Floor05: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  const handleBlogLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    navigateWithViewTransition(`/blog/${slug}`)
  }
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/blog')
        const data: BlogPost[] = await res.json()
        if (mounted) setBlogPosts(data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-16 text-center border-b border-white/20 pb-8">
          <h2 className="font-oswald text-6xl lg:text-7xl text-white mb-4">BLOG</h2>
          <p className="font-sans text-sm text-gray-400 tracking-widest">技術やエンジニアリング、日常についての記事</p>
        </div>

        {/* ブログ記事一覧 */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              onClick={(e) => handleBlogLinkClick(e, post.slug)}
              className="block no-underline"
            >
              <article 
                className="border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-colors cursor-pointer group"
                style={{ viewTransitionName: `blog-card-${post.slug}` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-500 mb-3">{post.date}</div>
                    <h3
                      className="font-oswald text-2xl lg:text-3xl text-white mb-3 group-hover:text-brand-accent transition-colors"
                      style={{ viewTransitionName: `blog-${post.slug}` }}
                    >
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] border border-white/30 px-2 py-1 text-gray-400 hover:border-white/60 hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center mt-6 lg:mt-0">
                    <div className="w-12 h-12 border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                      <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* フッター */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="font-sans text-xs text-gray-600 tracking-widest">END OF FLOOR 05</p>
        </div>
      </div>
    </section>
  )
}

export default Floor05

