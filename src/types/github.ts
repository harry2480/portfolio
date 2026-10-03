export type PRState = 'merged' | 'open' | 'closed'

export interface PR {
  id: number
  number: number
  title: string
  html_url: string
  state: PRState
  created_at: string
  updated_at: string
  repo_name: string
  repo_url: string
  labels: string[]
}

export interface RepoPRSummary {
  repo_name: string
  repo_url: string
  total: number
  merged: number
  open: number
  closed: number
  last_updated: string
}

export interface PRActivity {
  total: number
  repos: RepoPRSummary[]
  prs: PR[]
}

export interface Repo {
  id: number
  name: string
  description: string
  url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  updated_at: string
  ogImage: string
}
