'use client'

import React, { useState, useEffect } from 'react'
import gsap from 'gsap'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
  onFloorSelect: (floor: number) => void
}

const menuItems = [
  { floor: 1, label: 'ENTRANCE', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  { floor: 2, label: 'OFFICE', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  { floor: 3, label: 'LAB', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
  { floor: 4, label: 'ARCHIVE', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop' },
  { floor: 5, label: 'RECEPTION', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
]

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, onFloorSelect }) => {
  const [selectedLabel, setSelectedLabel] = useState('ENTRANCE')
  const [selectedImg, setSelectedImg] = useState(menuItems[0].img)

  useEffect(() => {
    if (isOpen) {
      gsap.to('#menu-overlay', { x: '0%', duration: 0.5, ease: 'power2.out' })
      gsap.fromTo('.menu-item', 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'power2.out' }
      )
    } else {
      gsap.to('#menu-overlay', { x: '100%', duration: 0.5, ease: 'power2.in' })
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleItemHover = (item: typeof menuItems[0]) => {
    gsap.to('#menu-img', { 
      opacity: 0, 
      duration: 0.2, 
      onComplete: () => {
        setSelectedImg(item.img)
        setSelectedLabel(item.label)
        gsap.to('#menu-img', { opacity: 0.5, duration: 0.3 })
      }
    })
  }

  return (
    <div 
      id="menu-overlay"
      onClick={() => onClose()}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transform translate-x-full transition-transform duration-500 flex items-center justify-center"
    >
      <button onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close menu" className="absolute top-6 right-6 z-50 text-white">×</button>
      <div onClick={(e) => e.stopPropagation()} className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl h-full p-10">
        {/* Image Preview */}
        <div className="hidden md:flex flex-col justify-center border-r border-white/10 pr-10">
          <div className="w-full aspect-video bg-gray-900 border border-white/20 overflow-hidden relative">
            <img 
              id="menu-img"
              src={selectedImg}
              alt={selectedLabel}
              className="w-full h-full object-cover opacity-50 grayscale transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bebas text-6xl text-white mix-blend-overlay">
                {selectedLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-center pl-0 md:pl-10 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.floor}
              className="menu-item text-left font-bebas text-6xl md:text-8xl text-gray-600 hover:text-white transition-colors duration-300 group"
              onMouseEnter={() => handleItemHover(item)}
              onClick={() => { onFloorSelect(item.floor); onClose() }}
            >
              <span className="text-sm font-sans tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity text-brand-accent mb-[-10px] ml-1">
                {item.floor.toString().padStart(2, '0')}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu