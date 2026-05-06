'use client'

import React, { useState, useEffect } from 'react'
import type { PR, PRState } from '@/types/github'

const stateColor: Record<PRState, string> = {
  merged: 'text-brand-accent',
  open: 'text-green-400',
  closed: 'text-gray-400',
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const secondsAgo = (now.getTime() - date.getTime()) / 1000

  if (secondsAgo < 60) return 'just now'
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d ago`

  return date.toLocaleDateString('ja-JP')
}

const Floor06: React.FC<{ onFloorSelect?: (floor: number) => void }> = () => {
  const [prs, setPrs] = useState<PR[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/github-prs')
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error || `Request failed: ${res.status}`)
        }
        const data: PR[] = await res.json()
        if (mounted) setPrs(data)
      } catch (err) {
        console.error(err)
        if (mounted) setError(err instanceof Error ? err.message : 'Unknown error')
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
        <div className="mb-16 text-center border-b border-white/20 pb-8">
          <h2 className="font-oswald text-6xl lg:text-8xl text-white mb-4">GITHUB</h2>
          <p className="font-sans text-sm text-gray-400 tracking-widest">Pull Request Activity</p>
        </div>

        {loading && (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 p-6 lg:p-8 animate-pulse"
              >
                <div className="h-3 bg-white/10 w-32 mb-4" />
                <div className="h-6 bg-white/10 w-3/4 mb-3" />
                <div className="h-4 bg-white/10 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="border border-white/20 p-8 text-center">
            <p className="font-sans text-sm text-brand-accent mb-2">Failed to load PRs</p>
            <p className="font-mono text-xs text-gray-500">{error}</p>
          </div>
        )}

        {!loading && !error && prs.length === 0 && (
          <div className="border border-white/20 p-8 text-center">
            <p className="font-sans text-sm text-gray-400">PR が見つかりません</p>
          </div>
        )}

        {!loading && !error && prs.length > 0 && (
          <div className="space-y-8">
            {prs.map((pr) => (
              <a
                key={pr.id}
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
              >
                <article className="border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-colors cursor-pointer group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`font-mono text-xs uppercase tracking-widest ${stateColor[pr.state]}`}>
                          {pr.state}
                        </span>
                        <span className="font-mono text-xs text-gray-500">
                          {pr.repo_name} #{pr.number}
                        </span>
                        <span className="font-mono text-xs text-gray-500">
                          {formatRelativeTime(pr.updated_at)}
                        </span>
                      </div>
                      <h3 className="font-oswald text-2xl lg:text-3xl text-white mb-3 group-hover:text-brand-accent transition-colors">
                        {pr.title}
                      </h3>
                      {pr.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pr.labels.map((label, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] border border-white/30 px-2 py-1 text-gray-400 hover:border-white/60 hover:text-white transition-colors"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
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
        )}

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="font-sans text-xs text-gray-600 tracking-widest">END OF FLOOR 06</p>
        </div>
      </div>
    </section>
  )
}

export default Floor06
