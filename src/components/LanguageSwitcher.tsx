'use client'

import React from 'react'
import { htmlLang, localeLabels, locales } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div role="group" aria-label={t.languageSwitcher.label} className="flex items-center gap-2 text-[10px] font-sans tracking-widest">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={htmlLang[l]}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`transition-opacity ${locale === l ? 'opacity-100 underline underline-offset-4' : 'opacity-50 hover:opacity-100'}`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  )
}
