'use client';

import React, { forwardRef } from 'react';

const FloorTransitIndicator = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="floor-transit-indicator">
      <span className="floor-transit-label">FLOOR</span>
      <span id="floor-number-display">01</span>
    </div>
  );
});

FloorTransitIndicator.displayName = 'FloorTransitIndicator';

export default FloorTransitIndicator;
