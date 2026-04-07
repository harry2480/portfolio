"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

const menuItems = [
  { floor: 1, label: '01 Entrance', path: '/' },
  { floor: 2, label: '02 Works', path: '/works' },
  { floor: 3, label: '03 Skill', path: '/skill' },
  { floor: 4, label: '04 About', path: '/about' },
  { floor: 5, label: '05 Blog', path: '/blog' },
]

export default function GlobalFloorLinks() {
  const pathname = usePathname() || '/'
  const router = useRouter()

  const handleFloorClick = (item: typeof menuItems[0]) => {
    if (pathname === item.path) return

    // Animate global elevator doors before navigation
    const floorDisplay = document.getElementById('floor-number-display')

    const tl = gsap.timeline()

    tl.to('.elevator-overlay', { opacity: 1, duration: 0.01 })
    .to('.elevator-door', { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }, 0)
      .add(() => {
        router.push(item.path)
        gsap.set('.floor-transit-indicator', { opacity: 1 })
        if (floorDisplay) {
          floorDisplay.innerText = item.floor.toString().padStart(2, '0')
        }
      })
      .to('.floor-transit-indicator', { opacity: 0, duration: 0.4 })
      .to('.elevator-door', { scaleX: 0, duration: 0.8, ease: 'expo.inOut' })
      .to('.elevator-overlay', { opacity: 0, duration: 0.4 })
  }

  return (
    <aside className="fixed left-6 bottom-10 z-40 hidden md:flex flex-col gap-2 font-oswald text-sm text-gray-500">
      {menuItems.map((item) => (
        <button
          key={item.floor}
          data-floor={item.floor}
          onClick={() => handleFloorClick(item)}
          className={`floor-marker text-left cursor-pointer hover:text-brand-accent transition-colors ${
            pathname === item.path ? 'text-white' : 'text-gray-500'
          }`}
        >
          {item.label}
        </button>
      ))}

      <div className="h-16 w-[1px] bg-gray-700 mt-2 ml-1" />
      <div className="transform -rotate-90 origin-bottom-left translate-x-3 translate-y-8 text-xs tracking-widest text-brand-accent">
        CURRENT FLOOR
      </div>
    </aside>
  )
}
