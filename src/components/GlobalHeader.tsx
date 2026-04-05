"use client"

import React, { useState, useEffect } from 'react'
import Header from './Header'
import Menu from './Menu'
import { usePathname, useRouter } from 'next/navigation'

const floorToPath: Record<number, string> = {
  1: '/',
  2: '/office',
  3: '/lab',
  4: '/archive',
  5: '/blog',
}

export default function GlobalHeader() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Only show global header on non-root pages to avoid duplicate header on Entrance
  if (pathname === '/') return null

  const handleFloorSelect = (floor: number) => {
    const p = floorToPath[floor] || '/'
    router.push(p)
  }

  return (
    <>
      <Header onMenuToggle={() => setIsOpen((s) => !s)} onFloorClick={handleFloorSelect} />
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} onFloorSelect={handleFloorSelect} />
    </>
  )
}
