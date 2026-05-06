/// <reference types="@cloudflare/workers-types" />
import type { Repo } from '../../src/types/github'

interface Env {
  GITHUB_TOKEN: string
}

interface RepoItem {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  topics?: string[]
  stargazers_count: number
  updated_at: string
}

const GITHUB_USERNAME = 'harry2480'
const CACHE_DURATION = 5 * 60 * 1000

let cachedRepos: Repo[] | null = null
let cacheTime = 0

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.GITHUB_TOKEN) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 400 })
  }

  if (cachedRepos && Date.now() - cacheTime < CACHE_DURATION) {
    return Response.json(cachedRepos, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  }

  const url =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
    `?type=public&per_page=100&sort=updated`

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
    return Response.json({ error: 'Failed to fetch repos' }, { status: 502 })
  }

  const data = (await res.json()) as RepoItem[]

  const repos: Repo[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    url: item.html_url,
    language: item.language,
    topics: item.topics ?? [],
    stargazers_count: item.stargazers_count,
    updated_at: item.updated_at,
    ogImage: `https://opengraph.githubassets.com/${item.id}/${item.full_name}`,
  }))

  cachedRepos = repos
  cacheTime = Date.now()

  return Response.json(repos, {
    headers: { 'Cache-Control': 'public, max-age=300' },
  })
}
