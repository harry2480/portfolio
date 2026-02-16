'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'

const ElevatorDoors: React.FC<{ currentFloor: number }> = ({ currentFloor }) => {
  useEffect(() => {
    // Animation logic is handled in useFloorNavigation hook
  }, [currentFloor])

  return (
    <>
      <div className="elevator-door elevator-door-left bg-gradient-to-r from-[#050505] to-[#111]" />
      <div className="elevator-door elevator-door-right bg-gradient-to-l from-[#050505] to-[#111]" />
      
      <div className="floor-transit-indicator">
        <span className="floor-transit-label">FLOOR</span>
        <span id="floor-number-display">{currentFloor.toString().padStart(2, '0')}</span>
      </div>
    </>
  )
}

export default ElevatorDoors
