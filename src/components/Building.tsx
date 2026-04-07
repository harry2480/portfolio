'use client'

import { useState } from 'react'
import Header from './Header'
import Menu from './Menu.tsx'
import FloorIndicator from './FloorIndicator.tsx'
import FloorsLayout from './FloorsLayout'
import { useFloorNavigation } from '@/hooks/useFloorNavigation'
import CodeBackground from './CodeBackground'

export const Building: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const { goToFloor } = useFloorNavigation(currentFloor, setCurrentFloor, isAnimating, setIsAnimating)

  return (
    <main className="relative z-10 w-full h-full">
      {/* Background: code listing only for Entrance + noise */}
      {currentFloor === 1 && <CodeBackground />}
      <div className="noise" />

      {/* Header */}
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onFloorClick={goToFloor}
      />

      {/* Floor Indicator */}
      <FloorIndicator currentFloor={currentFloor} onFloorClick={goToFloor} />

      {/* Menu Overlay */}
      <Menu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onFloorSelect={(floor: number) => {
          goToFloor(floor)
          setIsMenuOpen(false)
        }}
      />

      {/* Floors Layout */}
      <FloorsLayout currentFloor={currentFloor} onFloorSelect={goToFloor} />
    </main>
  )
}