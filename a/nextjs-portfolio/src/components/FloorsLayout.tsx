'use client'

import React from 'react'
import Floor01 from './floors/Floor01'
import Floor02 from './floors/Floor02'
import Floor03 from './floors/Floor03'
import Floor04 from './floors/Floor04'
import Floor05 from './floors/Floor05'

interface FloorsLayoutProps {
  currentFloor: number
}

const FloorsLayout: React.FC<FloorsLayoutProps> = ({ currentFloor }) => {
  return (
    <>
      {currentFloor === 1 && <Floor01 />}
      {currentFloor === 2 && <Floor02 />}
      {currentFloor === 3 && <Floor03 />}
      {currentFloor === 4 && <Floor04 />}
      {currentFloor === 5 && <Floor05 />}
    </>
  )
}

export default FloorsLayout
