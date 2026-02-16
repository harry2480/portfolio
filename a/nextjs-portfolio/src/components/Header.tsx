'use client'

import React from 'react'

interface HeaderProps {
  onMenuToggle: () => void
  onFloorClick: (floor: number) => void
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onFloorClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
      <div className="flex flex-col pointer-events-auto">
        <h1 
          className="font-bebas text-4xl leading-none tracking-widest cursor-pointer hover:text-brand-accent transition-colors"
          onClick={() => onFloorClick(1)}
        >
          BUILDING
        </h1>
        <span className="text-xs font-sans tracking-[0.3em] opacity-70">ENTRANCE SYSTEM</span>
      </div>
      
      <button 
        id="menu-btn"
        onClick={onMenuToggle}
        className="group flex flex-col items-end gap-1.5 cursor-pointer z-50 pointer-events-auto"
        aria-label="Menu"
      >
        <span className="w-10 h-[2px] bg-white transition-all duration-300 group-hover:w-8" />
        <span className="w-6 h-[2px] bg-white transition-all duration-300 group-hover:w-10" />
        <span className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-6" />
        <span className="text-[10px] font-bebas tracking-widest mt-1">MENU</span>
      </button>
    </header>
  )
}

export default Header
