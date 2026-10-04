'use client'

import React, { useState, useEffect, useMemo } from 'react'
import type { PRActivity, PRState } from '@/types/github'
import { useI18n } from '@/i18n/I18nProvider'
import { htmlLang, type Locale } from '@/i18n/config'

const PAGE_SIZE = 30
const GITHUB_USERNAME = 'harry2480'
const STATE_FILTERS: Array<PRState | 'all'> = ['all', 'merged', 'open', 'closed']

const stateColor: Record<PRState, string> = {
  merged: 'text-brand-accent',
  open: 'text-green-400',
  closed: 'text-gray-400',
}

function formatRelativeTime(dateString: string, locale: Locale): string {
  const date = new Date(dateString)
  const now = new Date()
  const secondsAgo = (now.getTime() - date.getTime()) / 1000

  if (secondsAgo < 60) return 'just now'
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d ago`

  return date.toLocaleDateString(htmlLang[locale])
}

function displayRepoName(repoName: string): string {
  const [owner, name] = repoName.split('/')
  return owner === GITHUB_USERNAME ? name : repoName
}

const chipBase = 'font-mono text-xs px-3 py-2 border transition-colors'
const chipActive = 'border-white text-white bg-white/10'
const chipInactive = 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'

const Floor06: React.FC<{ onFloorSelect?: (floor: number) => void }> = () => {
  const { locale, t } = useI18n()
  const [activity, setActivity] = useState<PRActivity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [stateFilter, setStateFilter] = useState<PRState | 'all'>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/github-prs', { signal: AbortSignal.timeout(15000) })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error || `Request failed: ${res.status}`)
        }
        const data = await res.json()
        if (!data || !Array.isArray(data.prs) || !Array.isArray(data.repos)) {
          throw new Error('Unexpected response shape')
        }
        if (mounted) setActivity(data as PRActivity)
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

  const repoPrs = useMemo(
    () =>
      (activity?.prs ?? []).filter((pr) => selectedRepo === null || pr.repo_name === selectedRepo),
    [activity, selectedRepo],
  )

  const stateCounts = useMemo(() => {
    const counts: Record<PRState | 'all', number> = { all: repoPrs.length, merged: 0, open: 0, closed: 0 }
    for (const pr of repoPrs) counts[pr.state]++
    return counts
  }, [repoPrs])

  const filteredPrs = useMemo(
    () => (stateFilter === 'all' ? repoPrs : repoPrs.filter((pr) => pr.state === stateFilter)),
    [repoPrs, stateFilter],
  )

  const visiblePrs = filteredPrs.slice(0, visibleCount)

  const selectRepo = (repo: string | null) => {
    setSelectedRepo(repo)
    setStateFilter('all')
    setVisibleCount(PAGE_SIZE)
  }

  const selectState = (state: PRState | 'all') => {
    setStateFilter(state)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        <div className="mb-16 text-center border-b border-white/20 pb-8">
          <h2 className="font-oswald text-6xl lg:text-8xl text-white mb-4">GitHub</h2>
          <p className="font-sans text-sm text-gray-400 tracking-widest">Pull Request Activity</p>
          {activity && (
            <p className="font-mono text-xs text-gray-500 mt-3 tracking-widest">
              {activity.total}
              {activity.truncated && '+'} PRs / {activity.repos.length} repos
            </p>
          )}
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

        {!loading && !error && activity && activity.total === 0 && (
          <div className="border border-white/20 p-8 text-center">
            <p className="font-sans text-sm text-gray-400">{t.github.empty}</p>
          </div>
        )}

        {!loading && !error && activity && activity.total > 0 && (
          <>
            <div className="mb-6">
              <p id="pr-repo-filter" className="font-sans text-[10px] text-gray-600 tracking-widest mb-3">REPOSITORY</p>
              <div role="group" aria-labelledby="pr-repo-filter" className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => selectRepo(null)}
                  aria-pressed={selectedRepo === null}
                  className={`${chipBase} ${selectedRepo === null ? chipActive : chipInactive}`}
                >
                  All <span className="text-gray-500">{activity.total}</span>
                </button>
                {activity.repos.map((repo) => (
                  <button
                    key={repo.repo_name}
                    type="button"
                    onClick={() => selectRepo(repo.repo_name)}
                    aria-pressed={selectedRepo === repo.repo_name}
                    title={repo.repo_name}
                    className={`${chipBase} ${selectedRepo === repo.repo_name ? chipActive : chipInactive}`}
                  >
                    {displayRepoName(repo.repo_name)} <span className="text-gray-500">{repo.total}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10 pb-6 border-b border-white/10">
              <p id="pr-state-filter" className="font-sans text-[10px] text-gray-600 tracking-widest mb-3">STATE</p>
              <div role="group" aria-labelledby="pr-state-filter" className="flex flex-wrap gap-2">
                {STATE_FILTERS.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => selectState(state)}
                    aria-pressed={stateFilter === state}
                    disabled={stateCounts[state] === 0}
                    className={`${chipBase} uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed ${
                      stateFilter === state ? chipActive : chipInactive
                    }`}
                  >
                    {state} <span className="text-gray-500">{stateCounts[state]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {visiblePrs.map((pr) => (
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
                            {formatRelativeTime(pr.updated_at, locale)}
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

            {visibleCount < filteredPrs.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="font-mono text-xs tracking-widest uppercase border border-white/30 px-8 py-4 text-gray-300 hover:border-white hover:text-white transition-colors"
                >
                  Load more ({filteredPrs.length - visibleCount})
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="font-sans text-xs text-gray-600 tracking-widest">END OF FLOOR 06</p>
        </div>
      </div>
    </section>
  )
}

export default Floor06
