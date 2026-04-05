"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const menuItems = [
  { floor: 1, label: '01 ENTRANCE', path: '/' },
  { floor: 2, label: '02 OFFICE', path: '/office' },
  { floor: 3, label: '03 LAB', path: '/lab' },
  { floor: 4, label: '04 ARCHIVE', path: '/archive' },
  { floor: 5, label: '05 BLOG', path: '/blog' },
]

export default function GlobalFloorLinks() {
  const pathname = usePathname() || '/'
  const router = useRouter()

  return (
    <aside className="fixed left-6 bottom-10 z-40 hidden md:flex flex-col gap-2 font-bebas text-sm text-gray-500">
      {menuItems.map((item) => (
        <button
          key={item.floor}
          data-floor={item.floor}
          onClick={() => router.push(item.path)}
          className={`floor-marker text-left cursor-pointer hover:text-brand-accent transition-colors ${
            pathname === item.path ? 'text-white' : 'text-gray-500'
          }`}
        >
          {item.label.replace(/^\d+\s*/, '') === 'ENTRANCE' ? '01 ENTRANCE' : item.label}
        </button>
      ))}

      <div className="h-16 w-[1px] bg-gray-700 mt-2 ml-1" />
      <div className="transform -rotate-90 origin-bottom-left translate-x-3 translate-y-8 text-xs tracking-widest text-brand-accent">
        CURRENT FLOOR
      </div>
    </aside>
  )
}
