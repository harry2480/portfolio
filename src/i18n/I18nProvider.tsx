'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALE_STORAGE_KEY, defaultLocale, htmlLang, isLocale, type Locale } from './config'
import ja, { type Dictionary } from './dictionaries/ja'
import en from './dictionaries/en'
import zh from './dictionaries/zh'
import ko from './dictionaries/ko'

const dictionaries: Record<Locale, Dictionary> = { ja, en, zh, ko }

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: dictionaries[defaultLocale],
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 静的 HTML は日本語で出力されるため、初回描画は日本語に揃えてハイドレーションの不一致を避ける。
  // 実際の言語は <head> のスクリプトが html[data-locale] に書いた値をマウント後に読む
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initial = document.documentElement.dataset.locale
    if (isLocale(initial)) setLocaleState(initial)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.lang = htmlLang[locale]
    root.dataset.locale = locale
    root.classList.remove('i18n-pending')
  }, [locale, ready])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {}
  }, [])

  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
