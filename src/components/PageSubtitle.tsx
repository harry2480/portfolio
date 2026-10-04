'use client'

import { useI18n } from '@/i18n/I18nProvider'

// サーバーコンポーネントのページから、見出し横の説明文だけを表示言語に合わせて出す
export function PageSubtitle({ page }: { page: 'works' | 'skill' }) {
  const { t } = useI18n()
  return <span className="font-sans text-xs tracking-widest mb-4">{t[page].subtitle}</span>
}
