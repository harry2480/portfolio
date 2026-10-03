/// <reference types="@cloudflare/workers-types" />
import type { PR, PRActivity, PRState, RepoPRSummary } from '../../src/types/github'

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

interface SearchResponse {
  total_count: number
  incomplete_results: boolean
  items: SearchItem[]
}

const GITHUB_USERNAME = 'harry2480'
const CACHE_DURATION = 5 * 60 * 1000
const PER_PAGE = 100
// Search API は最大 1000 件までしか返さない
const MAX_PAGES = 10
const FETCH_TIMEOUT = 8000

let cached: PRActivity | null = null
let cacheTime = 0
let inflight: Promise<PRActivity> | null = null

async function fetchSearchPage(token: string, page: number): Promise<SearchResponse> {
  const url =
    `https://api.github.com/search/issues` +
    `?q=${encodeURIComponent(`is:pr is:public author:${GITHUB_USERNAME}`)}` +
    // updated 順だと取得中の更新でページ境界がずれて欠落するため、不変な created 順で取得する
    `&sort=created&order=desc&per_page=${PER_PAGE}&page=${page}`

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'harry4869-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`)
  }

  return (await res.json()) as SearchResponse
}

function toPR(item: SearchItem): PR {
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
}

function summarizeByRepo(prs: PR[]): RepoPRSummary[] {
  const map = new Map<string, RepoPRSummary>()

  for (const pr of prs) {
    let summary = map.get(pr.repo_name)
    if (!summary) {
      summary = {
        repo_name: pr.repo_name,
        repo_url: pr.repo_url,
        total: 0,
        merged: 0,
        open: 0,
        closed: 0,
        last_updated: pr.updated_at,
      }
      map.set(pr.repo_name, summary)
    }
    summary.total++
    summary[pr.state]++
    if (pr.updated_at > summary.last_updated) summary.last_updated = pr.updated_at
  }

  return [...map.values()].sort((a, b) => b.last_updated.localeCompare(a.last_updated))
}

async function loadActivity(token: string): Promise<{ activity: PRActivity; complete: boolean }> {
  // セカンダリレート制限を避けるため逐次取得する
  const first = await fetchSearchPage(token, 1)
  const pageCount = Math.min(Math.ceil(first.total_count / PER_PAGE), MAX_PAGES)
  const pages = [first]
  for (let page = 2; page <= pageCount; page++) {
    pages.push(await fetchSearchPage(token, page))
  }

  const items = pages.flatMap((p) => p.items)
  const prs = [...new Map(items.map((item) => [item.id, item] as const)).values()]
    .map(toPR)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))

  return {
    activity: {
      total: prs.length,
      truncated: first.total_count > prs.length,
      repos: summarizeByRepo(prs),
      prs,
    },
    complete: pages.every((p) => !p.incomplete_results),
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.GITHUB_TOKEN) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 400 })
  }

  if (cached && Date.now() - cacheTime < CACHE_DURATION) {
    return Response.json(cached, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  }

  try {
    // 同時のキャッシュミスを 1 回の取得にまとめる
    inflight ??= loadActivity(env.GITHUB_TOKEN)
      .then(({ activity, complete }) => {
        // 不完全な結果はキャッシュしない
        if (complete) {
          cached = activity
          cacheTime = Date.now()
        }
        return activity
      })
      .finally(() => {
        inflight = null
      })
    const activity = await inflight

    return Response.json(activity, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  } catch (err) {
    console.error(err)
    if (cached) {
      return Response.json(cached, {
        headers: { 'Cache-Control': 'public, max-age=60' },
      })
    }
    return Response.json({ error: 'Failed to fetch PRs' }, { status: 502 })
  }
}
