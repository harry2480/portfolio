'use client'

import React from 'react'
import Floor01 from './floors/Floor01'
import Floor02 from './floors/Floor02'
import Floor03 from './floors/Floor03'
import Floor04 from './floors/Floor04'
import Floor05 from './floors/Floor05'
import Floor06 from './floors/Floor06'

interface FloorsLayoutProps {
  currentFloor: number
  onFloorSelect: (floor: number) => void
}

const FloorsLayout: React.FC<FloorsLayoutProps> = ({ currentFloor, onFloorSelect }) => {
  return (
    <>
      {currentFloor === 1 && <Floor01 onFloorSelect={onFloorSelect} />}
      {currentFloor === 2 && <Floor02 onFloorSelect={onFloorSelect} />}
      {currentFloor === 3 && <Floor03 onFloorSelect={onFloorSelect} />}
      {currentFloor === 4 && <Floor04 onFloorSelect={onFloorSelect} />}
      {currentFloor === 5 && <Floor05 onFloorSelect={onFloorSelect} />}
      {currentFloor === 6 && <Floor06 onFloorSelect={onFloorSelect} />}
    </>
  )
}

export default FloorsLayout