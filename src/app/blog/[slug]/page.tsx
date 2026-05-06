import { getPostBySlug, getPostSlugs } from '@/lib/content'
import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { BackToListButton } from './BackToListButton'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((s) => ({ slug: s }))
}

export default async function PostPage({ params }: Props) {
  const slug = params.slug
  let post
  try {
    post = getPostBySlug(slug)
  } catch (e) {
    return (
      <section className="floor-container">
        <div className="pt-32 px-6 pb-20 max-w-3xl mx-auto">
          <h1 className="font-oswald text-4xl text-white mb-4">404 - 記事が見つかりません</h1>
          <p className="font-sans text-gray-400 mb-6">申し訳ありません。お探しの記事は存在しません。</p>
          <Link href="/blog" className="text-brand-accent hover:underline">← ブログ一覧に戻る</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-3xl mx-auto">
        <BackToListButton />

        <article className="space-y-8">
          <div className="border-b border-white/20 pb-8">
            <div className="font-mono text-xs text-gray-500 mb-4">{post.date}</div>
            <h1
              className="font-oswald text-5xl lg:text-6xl text-white mb-6"
              style={{ viewTransitionName: `blog-${slug}` }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag, i) => (
                <span key={i} className="text-[10px] border border-white/30 px-3 py-1 text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none slide-enter-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="font-oswald text-2xl text-white mt-8 mb-4" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="font-oswald text-xl text-white mt-6 mb-3" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <div className="font-sans text-gray-300 leading-relaxed mb-4" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className="rounded-sm mb-4 overflow-auto" {...props} />
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
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  const language = match ? match[1] : 'text'

                  if (!inline) {
                    return (
                      <div className="rounded-sm mb-4 text-sm overflow-auto">
                        <SyntaxHighlighter
                          PreTag="div"
                          CodeTag="div"
                          style={vscDarkPlus}
                          language={language}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
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
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="font-sans text-xs text-gray-600 tracking-widest">END OF ARTICLE</p>
        </div>
      </div>
    </section>
  )
}
