'use client'

import React from 'react'

const workItems = [
  {
    id: 1,
    title: 'NEO COMMERCE PLATFORM',
    description: '大規模ECサイトのリニューアルプロジェクト。ヘッドレスコマースアーキテクチャを採用し、フロントエンドのパフォーマンスを劇的に改善。',
    tags: ['NEXT.JS', 'SHOPIFY'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'CORPORATE BRANDING',
    description: 'テック企業のブランディングサイト。WebGLを用いたデータビジュアライゼーションを実装し、企業の先進性を表現。',
    tags: ['THREE.JS', 'WEBGL'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'MUSIC FESTIVAL 2024',
    description: '大型音楽フェスの特設サイト。チケット販売システムとの連携および、タイムテーブルのリアルタイム更新機能を実装。',
    tags: ['VUE.JS', 'FIREBASE'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'AI DASHBOARD UI',
    description: 'AI解析ツールの管理画面UIデザインおよび実装。複雑なパラメータ設定を直感的に操作できるインターフェースを設計。',
    tags: ['REACT', 'TAILWIND'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  }
]

const Floor02: React.FC = () => {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-bebas text-6xl lg:text-8xl">OFFICE / WORKS</h2>
          <span className="font-sans text-xs tracking-widest mb-4">制作実績エリア</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {workItems.map((item, index) => (
            <article key={item.id} className={`group ${index % 2 === 1 && 'mt-0 md:mt-20'}`}>
              <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden mb-4">
                <img 
                  src={item.image}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  alt={item.title}
                />
              </div>
              <h3 className="font-bebas text-3xl mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {item.description}
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
