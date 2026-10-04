'use client'

import React from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import type { Dictionary } from '@/i18n/dictionaries/ja'

const workItems: { id: number; key: keyof Dictionary['floor02']['descriptions']; title: string; tags: string[]; image: string }[] = [
  {
    id: 1,
    key: 'neoCommerce',
    title: 'NEO COMMERCE PLATFORM',
    tags: ['NEXT.JS', 'SHOPIFY'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 2,
    key: 'corporateBranding',
    title: 'CORPORATE BRANDING',
    tags: ['THREE.JS', 'WEBGL'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    key: 'musicFestival',
    title: 'MUSIC FESTIVAL 2024',
    tags: ['VUE.JS', 'FIREBASE'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    key: 'aiDashboard',
    title: 'AI DASHBOARD UI',
    tags: ['REACT', 'TAILWIND'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  }
]

const Floor02: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  const { t } = useI18n()

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">Office / Works</h2>
          <span className="font-sans text-xs tracking-widest mb-4">{t.works.subtitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {workItems.map((item, index) => (
            <article key={item.id} className={`group ${index % 2 === 1 && 'mt-0 md:mt-20'}`}>
              <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden mb-4">
                {/* image disabled to keep code background visible */}
                <div className="w-full h-full bg-black/10" />
              </div>
              <h3 className="font-oswald text-3xl mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {t.floor02.descriptions[item.key]}
              </p>
              <div className="mt-4 flex gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] border border-white/30 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF FLOOR 02
        </div>
      </div>
    </section>
  )
}

export default Floor02