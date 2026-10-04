import type { Localized } from '@/i18n/config'

// YYYY-MM-DD（ゼロ埋め）。並び替えは文字列比較で行う
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type IsoDate = `${number}-${'0' | '1'}${Digit}-${'0' | '1' | '2' | '3'}${Digit}`

export interface RecordLink {
  label: string
  url: string
}

export interface Hackathon {
  name: Localized
  date: IsoDate
  team?: string
  product: string
  description?: Localized
  result?: Localized
  tags?: string[]
  links?: RecordLink[]
}

export interface OssContribution {
  repo: string
  title: Localized
  url: string
  date: IsoDate
  description?: Localized
}
