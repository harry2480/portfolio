'use client'

import React, { useEffect, ReactNode } from 'react'

interface LenisProviderProps {
  children: ReactNode
}

/**
 * LenisProvider
 * スムーススクロール機能を全体に適用（メインページスクロールのみ）
 * フロア内の個別スクロールには Lenis を無効にする
 */
export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // フロアコンテナのネイティブスクロールを有効化
    const floorContainers = document.querySelectorAll('.floor-container')
    floorContainers.forEach((container) => {
      ;(container as HTMLElement).style.overflowY = 'auto'
      ;(container as HTMLElement).style.scrollBehavior = 'smooth'
    })
  }, [])

  return <>{children}</>
}
