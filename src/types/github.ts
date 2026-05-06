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
