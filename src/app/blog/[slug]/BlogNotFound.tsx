'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nProvider'

export function BlogNotFound() {
  const { t } = useI18n()

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-3xl mx-auto">
        <h1 className="font-oswald text-4xl text-white mb-4">{t.blog.notFoundTitle}</h1>
        <p className="font-sans text-gray-400 mb-6">{t.blog.notFoundBody}</p>
        <Link href="/blog" className="text-brand-accent hover:underline">
          {t.blog.backToList}
        </Link>
      </div>
    </section>
  )
}
