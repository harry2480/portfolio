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
