'use client'

import React from 'react'
import { navigateWithViewTransition } from '@/lib/viewTransition'
import { useI18n } from '@/i18n/I18nProvider'

export function BackToListButton() {
  const { t } = useI18n()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigateWithViewTransition('/blog')
  }

  return (
    <a 
      href="/blog" 
      onClick={handleClick}
      className="mb-8 font-sans text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 w-fit"
    >
      {t.blog.backToList}
    </a>
  )
}
