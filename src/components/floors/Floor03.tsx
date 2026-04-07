'use client'

import React from 'react'

const Floor03: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">LAB / SKILLS</h2>
          <span className="font-sans text-xs tracking-widest mb-4">技術スタック</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/20 p-6 rounded-sm">
            <h3 className="font-oswald text-2xl mb-4 text-white">FRONTEND</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-sans">
              <li>React / Next.js / TypeScript</li>
              <li>Tailwind CSS / CSS Modules</li>
              <li>GSAP / Framer Motion</li>
              <li>Accessibility & Performance</li>
            </ul>
          </div>

          <div className="border border-white/20 p-6 rounded-sm">
            <h3 className="font-oswald text-2xl mb-4 text-white">BACKEND</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-sans">
              <li>Node.js / Express</li>
              <li>Python / FastAPI</li>
              <li>PostgreSQL / Redis</li>
              <li>REST / GraphQL</li>
            </ul>
          </div>

          <div className="border border-white/20 p-6 rounded-sm">
            <h3 className="font-oswald text-2xl mb-4 text-white">DEVOPS</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-sans">
              <li>Docker / Kubernetes</li>
              <li>GitHub Actions / CI</li>
              <li>AWS / Vercel</li>
              <li>Monitoring & Observability</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-sm">
            <h4 className="font-oswald text-xl mb-2 text-white">Experiment: Real-time Data Viz</h4>
            <p className="text-sm text-gray-400">Interactive WebGL visualizations using Three.js to explore streaming data.</p>
          </div>
          <div className="p-6 bg-[#0f0f0f] border border-white/10 rounded-sm">
            <h4 className="font-oswald text-xl mb-2 text-white">Tooling & Scripts</h4>
            <p className="text-sm text-gray-400">Lightweight scripts for automation and performance budgets (Lighthouse).</p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF FLOOR 03
        </div>
      </div>
    </section>
  )
}

export default Floor03