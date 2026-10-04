'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { AccessCard } from '../AccessCard'
import { useI18n } from '@/i18n/I18nProvider'

const Floor01: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  const router = useRouter()
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleEnterBuilding = () => {
    // Animate global elevator doors before navigation to office
    const floorDisplay = document.getElementById('floor-number-display')

    const tl = gsap.timeline()

    tl.to('.elevator-overlay', { opacity: 1, duration: 0.01 })
    .to('.elevator-door', { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }, 0)
      .add(() => {
        router.push('/works')
        gsap.set('.floor-transit-indicator', { opacity: 1 })
        if (floorDisplay) {
          floorDisplay.innerText = '02'
        }
      })
      .to('.floor-transit-indicator', { opacity: 0, duration: 0.4 })
      .to('.elevator-door', { scaleX: 0, duration: 0.8, ease: 'expo.inOut' })
      .to('.elevator-overlay', { opacity: 0, duration: 0.4 })
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to('.reveal-text', {
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      })
      .to('.reveal-item', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      }, "-=0.8")
    }, containerRef)

    return () => ctx.revert()
  }, [])




  return (
    <section className="floor-container floor-entrance">
      {/* Background Image (disabled to show code background) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/20 z-10" />
        {/* original background image removed to reveal code background */}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Building Signage */}
        <div className="text-center mb-12">
          <div ref={containerRef} className="reveal-text-container">
            <h2
              className="reveal-text text-[15vw] md:text-[10rem] leading-[0.8] tracking-tight opacity-100 lowercase"
              style={{ fontFamily: 'Bebas Neue, "Noto Sans JP", sans-serif' }}
            >
              harry4869.dev
            </h2>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="font-sans text-xs tracking-[0.5em] text-gray-400 reveal-item opacity-0 translate-y-4">
              EST. 2003 / harry4869.dev
            </p>
            <div className="w-20 h-[1px] bg-white/30 reveal-item opacity-0 scale-x-0" />
          </div>
        </div>

        <AccessCard onClick={handleEnterBuilding} />
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] tracking-widest font-sans">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gray-600" />
        </div>
      </div>

      {/* Additional Content */}
      <div className="relative z-10 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 min-h-[50vh] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-oswald text-4xl mb-8 text-gray-300">Building Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm text-gray-400 leading-relaxed">
            <div>
              <p className="mb-4">{t.floor01.guideIntro[0]}</p>
              <p>{t.floor01.guideIntro[1]}</p>
            </div>
            <div>
              <ul className="space-y-4 border-l border-white/20 pl-6">
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 02: WORKS</span>
                  {t.floor01.guide.works}
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 03: SKILL</span>
                  {t.floor01.guide.skill}
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 04: ABOUT</span>
                  {t.floor01.guide.about}
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 05: BLOG</span>
                  {t.floor01.guide.blog}
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 06: GITHUB</span>
                  {t.floor01.guide.github}
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 07: RECORDS</span>
                  {t.floor01.guide.records}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Floor01