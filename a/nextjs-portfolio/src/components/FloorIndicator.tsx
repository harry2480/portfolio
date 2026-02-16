'use client'

import React from 'react'

interface FloorIndicatorProps {
  currentFloor: number
  onFloorClick: (floor: number) => void
}

const floorLabels = [
  { id: 1, label: '01 ENTRANCE' },
  { id: 2, label: '02 OFFICE' },
  { id: 3, label: '03 LAB' },
  { id: 4, label: '04 ARCHIVE' },
  { id: 5, label: '05 RECEPTION' },
]

const FloorIndicator: React.FC<FloorIndicatorProps> = ({ currentFloor, onFloorClick }) => {
  return (
    <aside className="fixed left-6 bottom-10 z-30 hidden md:flex flex-col gap-2 font-bebas text-sm text-gray-500">
      {floorLabels.map((floor) => (
        <div
          key={floor.id}
          data-floor={floor.id}
          className={`floor-marker cursor-pointer hover:text-brand-accent transition-colors ${
            currentFloor === floor.id ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => onFloorClick(floor.id)}
        >
          {floor.label}
        </div>
      ))}
      <div className="h-16 w-[1px] bg-gray-700 mt-2 ml-1" />
      <div className="transform -rotate-90 origin-bottom-left translate-x-3 translate-y-8 text-xs tracking-widest text-brand-accent">
        CURRENT FLOOR
      </div>
    </aside>
  )
}

export default FloorIndicator
