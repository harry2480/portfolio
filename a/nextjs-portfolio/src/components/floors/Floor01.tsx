'use client'

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

const Floor01: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isHovering) {
        const tl = gsap.timeline({ repeat: -1 });
        tl.fromTo('.scan-line', 
          { top: '0%', opacity: 0 },
          { top: '5%', opacity: 1, duration: 0.1, ease: 'none' }
        )
        .to('.scan-line', 
          { top: '95%', opacity: 1, duration: 1.3, ease: 'none' }
        )
        .to('.scan-line', 
          { top: '100%', opacity: 0, duration: 0.1, ease: 'none' }
        );
      }
    })
    return () => ctx.revert()
  }, [isHovering])

  return (
    <section className="floor-container">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-50 grayscale"
          alt="Building Entrance"
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Building Signage */}
        <div className="text-center mb-12">
          <div className="reveal-text-container">
            <h2 className="reveal-text font-bebas text-[15vw] md:text-[10rem] leading-[0.8] tracking-tight mix-blend-overlay opacity-80">
              TOKYO<br />HQ
            </h2>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="font-sans text-xs tracking-[0.5em] text-gray-400 reveal-item opacity-0 translate-y-4">
              EST. 1998 / MINATO-KU
            </p>
            <div className="w-20 h-[1px] bg-white/30 reveal-item opacity-0 scale-x-0" />
          </div>
        </div>

        {/* Access Card */}
        <div 
          className="access-card relative w-full max-w-md p-8 rounded-sm backdrop-blur-md reveal-item opacity-0 translate-y-8 transform transition-all duration-500 hover:border-white/50 group cursor-pointer overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex justify-between items-start mb-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-sans text-gray-400 tracking-widest mb-1">VISITOR PASS</span>
              <span className="font-bebas text-2xl tracking-wide text-white">ACCESS GRANTED</span>
            </div>
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div className="font-mono text-xs text-gray-500">ID: GUEST-001</div>
            <div className="flex items-center gap-3">
              <span className="font-bebas text-xl tracking-widest group-hover:text-brand-accent transition-colors">TOUCH TO ENTER</span>
              <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          
          {/* Scan line effect */}
          {isHovering && (
            <div 
              className="scan-line absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, #FF0033 15%, #FF0033 85%, transparent)',
                boxShadow: '0 0 12px 2px rgba(255, 0, 51, 0.7)',
                filter: 'blur(0.5px)'
              }}
            />
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] tracking-widest font-sans">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-12 bg-gray-600" />
        </div>
      </div>

      {/* Additional Content */}
      <div className="relative z-10 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 min-h-[50vh] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-bebas text-4xl mb-8 text-gray-300">BUILDING GUIDE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm text-gray-400 leading-relaxed">
            <div>
              <p className="mb-4">
                本サイトは、Webエンジニアのポートフォリオを「架空の自社ビル」に見立てて構成しています。
                エレベーターを使って各フロア（ページ）へアクセスしてください。
              </p>
              <p>
                圧倒的な没入感と、機能的なアクセシビリティの両立を目指しました。
                スクロールすることで、建物の詳細情報や隠されたコンテンツを発見できます。
              </p>
            </div>
            <div>
              <ul className="space-y-4 border-l border-white/20 pl-6">
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 02: OFFICE</span>
                  制作実績・プロジェクトの展示エリア
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 03: LAB</span>
                  技術スタック・実験的コードの保管庫
                </li>
                <li>
                  <span className="block text-white font-bold text-xs mb-1">FLOOR 05: RECEPTION</span>
                  お問い合わせ・コンタクトフォーム
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
