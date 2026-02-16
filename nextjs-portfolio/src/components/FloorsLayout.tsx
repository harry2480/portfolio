'use client'

import React from 'react'
import Floor01 from './floors/Floor01'
import Floor02 from './floors/Floor02'
import Floor03 from './floors/Floor03'
import Floor04 from './floors/Floor04'
import Floor05 from './floors/Floor05'

interface FloorsLayoutProps {
  currentFloor: number
  onFloorClick: (floor: number) => void
}

const FloorsLayout: React.FC<FloorsLayoutProps> = ({ currentFloor, onFloorClick }) => {
  return (
    <>
      {currentFloor === 1 && <Floor01 onEnter={() => onFloorClick(2)} />}
      {currentFloor === 2 && <Floor02 />}
      {currentFloor === 3 && <Floor03 />}
      {currentFloor === 4 && <Floor04 />}
      {currentFloor === 5 && <Floor05 />}
    </>
  )
}

export default FloorsLayout
