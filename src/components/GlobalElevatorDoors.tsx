'use client'

import React from 'react'

const GlobalElevatorDoors: React.FC = () => {
  return (
    <>
      <div className="elevator-overlay fixed inset-0 bg-black pointer-events-none" />
      <div className="elevator-door elevator-door-left bg-gradient-to-r from-[#050505] to-[#111]" />
      <div className="elevator-door elevator-door-right bg-gradient-to-l from-[#050505] to-[#111]" />

      <div className="floor-transit-indicator">
        <span className="floor-transit-label">FLOOR</span>
        <span id="floor-number-display">01</span>
      </div>
    </>
  )
}

export default GlobalElevatorDoors
