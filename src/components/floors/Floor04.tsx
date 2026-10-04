'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/i18n/I18nProvider'

const Floor04: React.FC<{ onFloorSelect?: (floor: number) => void }> = ({ onFloorSelect }) => {
  const router = useRouter()
  const { t } = useI18n()
  
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        {/* Hero / Title Section */}
        <div className="flex items-end justify-between mb-16 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">About</h2>
          <span className="font-sans text-xs tracking-widest mb-4">{t.about.subtitle}</span>
        </div>

        {/* Tagline */}
        <div className="mb-16">
        <h3 className="font-oswald text-2xl text-white mb-4">Profile</h3>
          <p className="font-sans text-sm text-gray-300 leading-relaxed">
            {t.about.profile}
          </p>
        </div>

        <div className="space-y-20 font-sans text-sm text-gray-400 leading-relaxed">

          {/* CONCEPT */}
          <div>
            <h3 className="font-oswald text-2xl text-white mb-4">Concept</h3>
            <p>{t.about.concept}</p>
          </div>

          {/* WORKS / SELECTED PROJECTS */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-oswald text-2xl text-white">Works</h3>
              <button
                onClick={() => router.push('/works')}
                className="border border-white/30 px-4 py-2 text-xs font-oswald hover:bg-white/10 transition-colors"
              >
                {t.about.viewAllWorks}
              </button>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Card 1 */}
              <div className="border border-white/20 p-4 rounded-sm">
                <p className="text-white font-bold text-sm mb-2">{t.about.birdman.title}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {t.about.birdman.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] border border-white/30 px-2 py-1">{t.about.birdman.tag}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href="https://github.com/oitbirdman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 px-3 py-1 text-xs font-oswald hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2 inline-block" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.335-5.467-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GITHUB
                  </a>
                  <a
                    href="https://oitbirdman.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 px-3 py-1 text-xs font-oswald hover:bg-white/10 transition-colors">
                    WEB
                  </a>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="border border-white/20 p-4 rounded-sm">
                <p className="text-white font-bold text-sm mb-2">{t.about.shootingGame.title}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {t.about.shootingGame.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] border border-white/30 px-2 py-1">Unity</span>
                  <span className="text-[10px] border border-white/30 px-2 py-1">PM</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href="https://github.com/harry2480/graduation-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 px-3 py-1 text-xs font-oswald hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2 inline-block" aria-hidden="true" focusable="false">
                      <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.335-5.467-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GITHUB
                  </a>
                 
                   <a
                     href="https://harry2480.github.io/civilwar"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="border border-white/30 px-3 py-1 text-xs font-oswald hover:bg-white/10 transition-colors">
                     WEB
                   </a>
                </div>
              </div>
            </div>
          </div>

          {/* MEDIA & AWARDS */}
          <div>
            <h3 className="font-oswald text-2xl text-white mb-6">Media & Awards</h3>
            <div className="space-y-3 text-xs">
              {t.about.media.map((item) => (
                <div key={item.title} className="border-l-2 border-brand-accent pl-3">
                  <p className="text-white font-bold">{item.title}</p>
                  <p className="text-gray-400">{item.detail}</p>
                </div>
              ))}
              {/*
              <div className="border-l-2 border-brand-accent pl-3">
                <p className="text-white font-bold">資格・免許</p>
                <p className="text-gray-400">IT パスポート、P 検 2 級、普通自動車第一種免許、三級知的財産管理技能士（2024年4月取得）</p>
              </div>
              */}
            </div>
          </div>

          {/* PERSONAL */}
          <div>
            <h3 className="font-oswald text-2xl text-white mb-4">Interest</h3>
            {t.about.interest}
            {/*
            <div className="space-y-3 text-xs text-gray-400">
              <p>
                <span className="text-white font-bold">神経発達特性:</span> AuDHD（ASD と ADHD の共存）
              </p>
              <p>
                <span className="text-white font-bold">行動特性:</span> 過集中と注意のむら、バーンアウトしやすい傾向。回復には一人の時間が必要。
              </p>
              <p>
                <span className="text-white font-bold">趣味:</span> 音楽鑑賞（AAA, SKY-HI, BE:FIRST など）、LIVE 参加、個人開発
              </p>
              <p>
                <span className="text-white font-bold">作業スタイル:</span> ポモドーロ・テクニック（25分集中・5分休憩）利用。図や表で可視化された情報を最も理解しやすい。
              </p>
            </div>
            */}
          </div>

          {/* CONTACT */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
            <h3 className="font-oswald text-2xl text-white mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-6">
              {t.about.contact}
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:contact@harry4869.dev"
                className="border border-white/30 px-4 py-2 text-xs font-oswald hover:bg-white/10 transition-colors"
              >
                EMAIL
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF ABOUT
        </div>
      </div>
    </section>
  )
}

export default Floor04
