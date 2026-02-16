'use client'

import React from 'react'

const Floor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="floor-container">
      {children}
    </section>
  )
}

export default Floor