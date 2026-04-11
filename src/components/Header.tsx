'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onMenuToggle: () => void
  onFloorClick?: (floor: number) => void
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onFloorClick }) => {
  const router = useRouter()
  
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-start mix-blend-difference text-white pointer-events-none">
      <div className="flex flex-col pointer-events-auto">
        <h1 
          className="text-4xl leading-none tracking-widest cursor-pointer hover:text-brand-accent transition-colors lowercase"
          style={{ fontFamily: 'Bebas Neue, "Noto Sans JP", sans-serif' }}
          onClick={() => {
            router.push('/')
            onFloorClick?.(1)
          }}
        >
          Harry
        </h1>
        <span className="text-xs font-sans tracking-[0.3em] opacity-70">Portfolio Site</span>
      </div>
      
      <div className="flex flex-col items-end gap-4 pointer-events-auto">
        {/* GitHub Icon Link */}
        <a
          href="https://github.com/harry2480/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="group flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* Menu Button */}
        <button
          id="menu-btn"
          onClick={onMenuToggle}
          className="group flex flex-col items-end gap-1.5 cursor-pointer z-50"
          aria-label="Menu"
        >
          <span className="w-10 h-[2px] bg-white transition-all duration-300 group-hover:w-8" />
          <span className="w-6 h-[2px] bg-white transition-all duration-300 group-hover:w-10" />
          <span className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-6" />
          <span className="text-[10px] font-oswald tracking-widest mt-1">Menu</span>
        </button>
      </div>
    </header>
  )
}

export default Header 
