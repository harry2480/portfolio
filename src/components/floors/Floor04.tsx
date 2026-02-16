'use client'

import React from 'react'

const Floor04: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-bebas text-6xl lg:text-8xl">ARCHIVE / ABOUT</h2>
          <span className="font-sans text-xs tracking-widest mb-4">経歴・自己紹介</span>
        </div>

        <div className="space-y-16 font-sans text-sm text-gray-400 leading-relaxed">
          <div>
            <h3 className="font-bebas text-2xl text-white mb-4">CONCEPT</h3>
            <p>
              私の制作スタンスは、プロダクト思考と技術のバランスを重視することです。
              デザインとパフォーマンスを両立させたインタラクティブな体験作りを得意としています。
            </p>
          </div>

          <div>
            <h3 className="font-bebas text-2xl text-white mb-4">EXPERIENCE</h3>
            <div className="space-y-6 border-l border-white/20 pl-6">
              <div>
                <p className="text-white font-bold text-xs mb-1">2022 - PRESENT</p>
                <p className="text-white">Senior Frontend Engineer @ Tech Company</p>
                <p className="text-xs mt-2">React, TypeScript, Design Systems の構築と運用</p>
              </div>

              <div>
                <p className="text-white font-bold text-xs mb-1">2020 - 2022</p>
                <p className="text-white">Full Stack Developer @ Startup</p>
                <p className="text-xs mt-2">Next.js, Node.js, AWS を用いた MVP 構築</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bebas text-2xl text-white mb-4">CONTACT</h3>
            <p>コラボレーションのご相談はお気軽にどうぞ。ご用件はRECEPTIONから送信できます。</p>
            <div className="mt-6">
              <button onClick={() => onFloorSelect?.(5)} className="bg-white text-black px-6 py-3 font-bebas">GO TO RECEPTION</button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF FLOOR 04
        </div>
      </div>
    </section>
  )
}

export default Floor04