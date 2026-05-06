/// <reference types="@cloudflare/workers-types" />
import type { PR, PRState } from '../../src/types/github'

interface Env {
  GITHUB_TOKEN: string
}

interface SearchItem {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  created_at: string
  updated_at: string
  repository_url: string
  labels?: Array<string | { name?: string }>
  pull_request?: { merged_at?: string | null }
}

const GITHUB_USERNAME = 'harry2480'
const CACHE_DURATION = 5 * 60 * 1000

let cachedPrs: PR[] | null = null
let cacheTime = 0

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.GITHUB_TOKEN) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 400 })
  }

  if (cachedPrs && Date.now() - cacheTime < CACHE_DURATION) {
    return Response.json(cachedPrs, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  }

  const url =
    `https://api.github.com/search/issues` +
    `?q=${encodeURIComponent(`is:pr author:${GITHUB_USERNAME}`)}` +
    `&sort=updated&order=desc&per_page=50`

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      'User-Agent': 'harry4869-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!res.ok) {
    console.error('GitHub API error:', res.status, await res.text())
    return Response.json({ error: 'Failed to fetch PRs' }, { status: 502 })
  }

  const data = (await res.json()) as { items: SearchItem[] }

  const prs: PR[] = data.items.map((item) => {
    const repoSegments = item.repository_url.split('/').slice(-2)
    const repoName = repoSegments.length === 2 ? repoSegments.join('/') : ''
    const repoUrl = item.html_url.split('/pull/')[0] || ''
    const merged = Boolean(item.pull_request?.merged_at)
    const state: PRState = merged ? 'merged' : item.state === 'open' ? 'open' : 'closed'

    return {
      id: item.id,
      number: item.number,
      title: item.title,
      html_url: item.html_url,
      state,
      created_at: item.created_at,
      updated_at: item.updated_at,
      repo_name: repoName,
      repo_url: repoUrl,
      labels: (item.labels || [])
        .map((l) => (typeof l === 'string' ? l : l.name))
        .filter((name): name is string => Boolean(name)),
    }
  })

  cachedPrs = prs
  cacheTime = Date.now()

  return Response.json(prs, {
    headers: { 'Cache-Control': 'public, max-age=300' },
  })
}
