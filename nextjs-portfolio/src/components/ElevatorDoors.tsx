'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'

const Door: React.FC<{ side: 'left' | 'right' }> = React.memo(({ side }) => (
  <div className={`elevator-door elevator-door-${side} bg-gradient-to-${side === 'left' ? 'r' : 'l'} from-[#050505] to-[#111]`} />
))

const ElevatorDoors: React.FC<{ currentFloor: number }> = ({ currentFloor }) => {
  return (
    <>
      <Door side="left" />
      <Door side="right" />
      
      <div className="floor-transit-indicator">
        <span className="floor-transit-label">FLOOR</span>
        <span id="floor-number-display">{currentFloor.toString().padStart(2, '0')}</span>
      </div>
    </>
  )
}

export default ElevatorDoors
