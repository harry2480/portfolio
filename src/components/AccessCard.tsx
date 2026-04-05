'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface AccessCardProps {
  onClick: () => void
}

/**
 * AccessCard Component
 * - /nextjs-portfolio の Floor01 にあるホバー時のスキャンライン（GSAP）を取り込み
 * - keyboard / accessibility を保持
 */
export function AccessCard({ onClick }: AccessCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovering) {
        const tl = gsap.timeline({ repeat: -1 })
        tl.fromTo(
          '.scan-line',
          { top: '0%', opacity: 0 },
          { top: '5%', opacity: 1, duration: 0.1, ease: 'none' }
        )
          .to('.scan-line', { top: '95%', opacity: 1, duration: 1.3, ease: 'none' })
          .to('.scan-line', { top: '100%', opacity: 0, duration: 0.1, ease: 'none' })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isHovering])

  return (
    <div
      ref={containerRef}
      className="access-card w-full max-w-md p-8 group cursor-pointer transition-all duration-300 transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent border border-white/20 relative"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Enter building - press Enter or Space"
      style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}
    >
      {/* ヘッダー */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex flex-col">
          <span className="text-[10px] font-sans text-gray-400 tracking-widest mb-1 uppercase">VISITOR PASS</span>
          <span className="font-bebas text-2xl tracking-wide text-white uppercase">ACCESS GRANTED</span>
        </div>
        <div className="border border-white/30 rounded-full flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
          <div className="rounded-full animate-pulse bg-green-500" style={{ width: '8px', height: '8px' }} />
        </div>
      </div>

      {/* フッター */}
      <div className="flex items-end justify-between">
        <div className="font-mono text-xs text-gray-500">ID: GUEST-001</div>
        <div className="flex items-center gap-3">
          <span className="font-bebas text-xl tracking-widest group-hover:text-brand-accent transition-colors">TOUCH TO ENTER</span>
          <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Scan line: GSAP-driven (when JS enabled), CSS fallback with group-hover */}
      {isHovering ? (
        <div
          className="scan-line absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, #FF0033 15%, #FF0033 85%, transparent)',
            boxShadow: '0 0 12px 2px rgba(255, 0, 51, 0.7)',
            filter: 'blur(0.5px)'
          }}
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-scan" />
      )}
    </div>
  )
}
