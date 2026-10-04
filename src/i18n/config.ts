export const locales = ['ja', 'en', 'zh', 'ko'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ja'

export const LOCALE_STORAGE_KEY = 'locale'

// <html lang> に入れる BCP 47 タグ
export const htmlLang: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  zh: 'zh-CN',
  ko: 'ko',
}

export const localeLabels: Record<Locale, string> = {
  ja: 'JA',
  en: 'EN',
  zh: '中文',
  ko: '한국어',
}

export type Localized<T = string> = Record<Locale, T>

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}
