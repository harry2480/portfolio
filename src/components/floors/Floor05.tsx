'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface BlogPost {
  id: number
  date: string
  title: string
  excerpt: string
  tags: string[]
  content: string
}

const Floor05: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
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

  // loading 中は空リストでも動作するようにする
  const selectedPost = blogPosts.find(post => post.id === selectedPostId)

  return (
    <section className="floor-container">
      {selectedPost ? (
        // 詳細ビュー
        <div className="pt-32 px-6 pb-20 max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedPostId(null)}
            className="mb-8 font-sans text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            ← 記事一覧に戻る
          </button>

          <article className="space-y-8">
            {/* ヘッダー */}
            <div className="border-b border-white/20 pb-8">
              <div className="font-mono text-xs text-gray-500 mb-4">{selectedPost.date}</div>
              <h1 className="font-bebas text-5xl lg:text-6xl text-white mb-6">{selectedPost.title}</h1>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] border border-white/30 px-3 py-1 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* コンテンツ */}
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="font-bebas text-2xl text-white mt-8 mb-4" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="font-bebas text-xl text-white mt-6 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <div className="font-sans text-gray-300 leading-relaxed mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="font-sans text-gray-300 list-disc list-inside mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="font-sans text-gray-300 list-decimal list-inside mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="font-sans text-gray-300" {...props} />
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const language = match ? match[1] : 'text'

                    if (!inline) {
                      return (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={language}
                          className="rounded-sm mb-4 text-sm"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      )
                    }

                    return (
                      <code className="bg-black/50 border border-white/20 px-2 py-1 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    )
                  },
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-brand-accent pl-4 italic text-gray-400 my-4" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table className="w-full border-collapse my-4" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-white/20 px-3 py-2 text-left text-white bg-white/10" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-white/20 px-3 py-2 text-gray-300" {...props} />
                  ),
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </article>

          <div className="mt-16 pt-8 border-t border-white/20 text-center">
            <p className="font-sans text-xs text-gray-600 tracking-widest">END OF ARTICLE</p>
          </div>
        </div>
      ) : (
        // 一覧ビュー
        <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-16 text-center border-b border-white/20 pb-8">
            <h2 className="font-bebas text-6xl lg:text-7xl text-white mb-4">BLOG</h2>
            <p className="font-sans text-sm text-gray-400 tracking-widest">技術やエンジニアリング、日常についての記事（一部<a href="https://zenn.dev/harry4869" target="_blank" className="text-brand-accent hover:underline">Zenn</a>）にも公開中</p>
          </div>

          {/* ブログ記事一覧 */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-500 mb-3">{post.date}</div>
                    <h3 className="font-bebas text-2xl lg:text-3xl text-white mb-3 group-hover:text-brand-accent transition-colors">
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
            ))}
          </div>

          {/* フッター */}
          <div className="mt-16 pt-8 border-t border-white/20 text-center">
            <p className="font-sans text-xs text-gray-600 tracking-widest">END OF FLOOR 05</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Floor05

