import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'
import type { PR } from '@/types/github'

const GITHUB_USERNAME = 'harry2480'
const CACHE_DURATION = 5 * 60 * 1000

let cachedPrs: PR[] | null = null
let cacheTime = 0

export async function GET() {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN not configured' },
      { status: 400 }
    )
  }

  if (cachedPrs && Date.now() - cacheTime < CACHE_DURATION) {
    return NextResponse.json(cachedPrs, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  }

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

    const response = await octokit.rest.search.issuesAndPullRequests({
      q: `is:pr author:${GITHUB_USERNAME}`,
      sort: 'updated',
      order: 'desc',
      per_page: 50,
    })

    const prs: PR[] = response.data.items.map((item) => {
      const repoSegments = item.repository_url.split('/').slice(-2)
      const repoName = repoSegments.length === 2 ? repoSegments.join('/') : ''
      const repoUrl = item.html_url.split('/pull/')[0] || ''
      const merged = Boolean(item.pull_request?.merged_at)
      const state: PR['state'] = merged
        ? 'merged'
        : item.state === 'open'
          ? 'open'
          : 'closed'

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

    return NextResponse.json(prs, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PRs' },
      { status: 502 }
    )
  }
}
