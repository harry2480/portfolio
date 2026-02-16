'use client'

import React from 'react'

interface AccessCardProps {
  onClick: () => void
}

/**
 * AccessCard Component
 * Floor 01 ENTRANCE での「TOUCH TO ENTER」CTA カード
 */
export function AccessCard({ onClick }: AccessCardProps) {
  return (
    <div
      className="access-card w-full max-w-md p-8 group cursor-pointer transition-all duration-300 transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent border border-white/20"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      aria-label="Enter building - press Enter or Space"
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '2px',
      }}
    >
      {/* ヘッダー */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex flex-col">
          <span className="text-[10px] font-sans text-gray-400 tracking-widest mb-1 uppercase">
            Visitor Pass
          </span>
          <span className="font-bebas text-2xl tracking-wide text-white uppercase">
            Access Granted
          </span>
        </div>
        <div className="border border-white/30 rounded-full flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
          <div className="rounded-full animate-pulse bg-green-500" style={{ width: '8px', height: '8px' }}></div>
        </div>
      </div>

      {/* フッター */}
      <div className="flex items-end justify-between">
        <div className="font-mono text-xs text-gray-500">ID: GUEST-001</div>
        <div className="flex items-center gap-3">
          <span className="font-bebas text-xl tracking-widest group-hover:text-brand-accent transition-colors">
            TOUCH TO ENTER
          </span>
          <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* スキャンラインエフェクト */}
      <div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-scan"
      />
    </div>
  )
}
