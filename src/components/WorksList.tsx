'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import type { Repo } from '@/types/github'

const SKELETON_COUNT = 6
const PAGE_SIZE = 10

type SortKey = 'updated' | 'stars' | 'name'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'updated', label: 'Updated' },
  { key: 'stars', label: 'Stars' },
  { key: 'name', label: 'Name' },
]

const compareUpdated = (a: Repo, b: Repo) => Date.parse(b.updated_at) - Date.parse(a.updated_at)

const sorters: Record<SortKey, (a: Repo, b: Repo) => number> = {
  updated: compareUpdated,
  stars: (a, b) => b.stargazers_count - a.stargazers_count || compareUpdated(a, b),
  name: (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
}

const chipBase = 'font-mono text-xs px-3 py-2 border transition-colors'
const chipActive = 'border-white text-white bg-white/10'
const chipInactive = 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'

function pageItems(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const items: (number | 'gap')[] = []
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1]
    if (i > 0 && p - prev === 2) items.push(prev + 1)
    else if (i > 0 && p - prev > 2) items.push('gap')
    items.push(p)
  })
  return items
}

export function WorksList() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('updated')
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const sortedRepos = useMemo(() => [...repos].sort(sorters[sortKey]), [repos, sortKey])
  const totalPages = Math.max(1, Math.ceil(sortedRepos.length / PAGE_SIZE))
  const pagedRepos = sortedRepos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const selectSort = (key: SortKey) => {
    setSortKey(key)
    setPage(1)
  }

  const goToPage = (next: number) => {
    setPage(next)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    topRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    topRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/github-repos')
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error || `Request failed: ${res.status}`)
        }
        const data: Repo[] = await res.json()
        if (mounted) setRepos(data)
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={`group ${i % 2 === 1 ? 'mt-0 md:mt-20' : ''}`}>
            <div className="relative aspect-video bg-white/5 border border-white/10 mb-4 animate-pulse" />
            <div className="h-7 bg-white/10 w-3/4 mb-3 animate-pulse" />
            <div className="h-4 bg-white/10 w-full mb-2 animate-pulse" />
            <div className="h-4 bg-white/10 w-2/3 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-white/20 p-8 text-center">
        <p className="font-sans text-sm text-brand-accent mb-2">Failed to load repositories</p>
        <p className="font-mono text-xs text-gray-500">{error}</p>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="border border-white/20 p-8 text-center">
        <p className="font-sans text-sm text-gray-400">リポジトリが見つかりません</p>
      </div>
    )
  }

  return (
    <>
      <div ref={topRef} tabIndex={-1} className="mb-10 pb-6 border-b border-white/10 scroll-mt-32 outline-none">
        <p id="works-sort" className="font-sans text-[10px] text-gray-600 tracking-widest mb-3">SORT BY</p>
        <div role="group" aria-labelledby="works-sort" className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectSort(option.key)}
              aria-pressed={sortKey === option.key}
              className={`${chipBase} uppercase tracking-widest ${sortKey === option.key ? chipActive : chipInactive}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {pagedRepos.map((project, i) => {
          const tags = [
            ...(project.language ? [project.language] : []),
            ...project.topics.map((t) => t.toUpperCase()),
          ].slice(0, 3)

          return (
            <ProjectCard
              key={project.id}
              title={project.name}
              description={project.description}
              image={project.ogImage}
              technologies={tags}
              url={project.url}
              badges={[
                ...(project.fork ? ['Fork'] : []),
                ...(project.archived ? ['Public archive'] : []),
                ...(project.is_template ? ['Template'] : []),
              ]}
              index={i}
            />
          )
        })}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Works pagination" className="mt-20 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="前のページ"
            className={`${chipBase} ${chipInactive} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            ←
          </button>
          {pageItems(page, totalPages).map((item, i) =>
            item === 'gap' ? (
              <span key={`gap-${i}`} aria-hidden="true" className="font-mono text-xs text-gray-600 px-1">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => goToPage(item)}
                aria-current={item === page ? 'page' : undefined}
                className={`${chipBase} min-w-[2.5rem] ${item === page ? chipActive : chipInactive}`}
              >
                {item}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="次のページ"
            className={`${chipBase} ${chipInactive} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            →
          </button>
        </nav>
      )}

      <div className="mt-12 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
        {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sortedRepos.length)} / {sortedRepos.length} projects
      </div>
    </>
  )
}
