'use client'

import React, { ReactNode } from 'react'

interface FloorContainerProps {
  id: number
  isActive: boolean
  children: ReactNode
  backgroundImage?: string
}

/**
 * FloorContainer Component
 * 各フロアのスクロール可能なコンテナ
 * background image 固定、内部スクロール可能
 */
export function FloorContainer({
  id,
  isActive,
  children,
  backgroundImage,
}: FloorContainerProps) {
  return (
    <section
      id={`floor-${id}`}
      className={`floor-container absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      role="region"
      aria-label={`Floor ${id}`}
    >
      {/* 背景画像（固定） */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src={backgroundImage}
            alt="Floor background"
            className="w-full h-full object-cover opacity-50 grayscale"
          />
        </div>
      )}

      {/* コンテンツ */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
