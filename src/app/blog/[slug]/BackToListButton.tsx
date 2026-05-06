'use client'

import React from 'react'
import { navigateWithViewTransition } from '@/lib/viewTransition'

export function BackToListButton() {
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
      ← ブログ一覧に戻る
    </a>
  )
}
