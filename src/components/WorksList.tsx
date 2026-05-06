'use client'

import React, { useState, useEffect } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import type { Repo } from '@/types/github'

const SKELETON_COUNT = 6

export function WorksList() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {repos.map((project, i) => {
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
              index={i}
            />
          )
        })}
      </div>

      <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
        END OF WORKS ({repos.length} projects)
      </div>
    </>
  )
}
