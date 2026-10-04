'use client'

import React from 'react'
import { hackathons, ossContributions } from '@/data/records'
import { useI18n } from '@/i18n/I18nProvider'

const formatDate = (date: string) => date.replace(/-/g, '.')

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date)

const Floor07: React.FC<{ onFloorSelect?: (floor: number) => void }> = () => {
  const { locale, t } = useI18n()
  const sortedHackathons = [...hackathons].sort(byDateDesc)
  const sortedOss = [...ossContributions].sort(byDateDesc)

  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">Records</h2>
          <span className="font-sans text-xs tracking-widest mb-4">{t.records.subtitle}</span>
        </div>

        {/* HACKATHONS */}
        <div className="mb-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-8">
            <h3 className="font-oswald text-3xl text-white">Hackathons</h3>
            <span className="font-mono text-xs text-gray-500 tracking-widest">{sortedHackathons.length} {sortedHackathons.length === 1 ? 'EVENT' : 'EVENTS'}</span>
          </div>

          {sortedHackathons.length === 0 ? (
            <p className="font-sans text-sm text-gray-500">{t.records.empty}</p>
          ) : (
            <ol className="space-y-6">
              {sortedHackathons.map((h) => (
                <li key={`${h.date}-${h.product}`}>
                  <article className="border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <time dateTime={h.date} className="font-mono text-xs text-gray-500">
                        {formatDate(h.date)}
                      </time>
                      {h.team && <span className="font-mono text-xs text-gray-500">{h.team}</span>}
                      {h.result && (
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-accent">{h.result[locale]}</span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-gray-400 mb-1">{h.name[locale]}</p>
                    <h4 className="font-oswald text-2xl lg:text-3xl text-white mb-3 break-words">{h.product}</h4>
                    {h.description && (
                      <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">{h.description[locale]}</p>
                    )}
                    {h.tags && h.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {h.tags.map((tag, i) => (
                          <span key={`${i}-${tag}`} className="text-[10px] border border-white/30 px-2 py-1 text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {h.links && h.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {h.links.map((link, i) => (
                          <a
                            key={`${i}-${link.url}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/30 px-3 py-1 text-xs font-oswald uppercase hover:bg-white/10 transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* OSS CONTRIBUTIONS */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-8">
            <h3 className="font-oswald text-3xl text-white">OSS Contributions</h3>
            <span className="font-mono text-xs text-gray-500 tracking-widest">{sortedOss.length} {sortedOss.length === 1 ? 'CONTRIBUTION' : 'CONTRIBUTIONS'}</span>
          </div>

          {sortedOss.length === 0 ? (
            <p className="font-sans text-sm text-gray-500">{t.records.empty}</p>
          ) : (
            <ul className="space-y-4">
              {sortedOss.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline border-l-2 border-brand-accent pl-4 py-2 group"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-gray-400 break-all">{c.repo}</span>
                      <time dateTime={c.date} className="font-mono text-xs text-gray-500">
                        {formatDate(c.date)}
                      </time>
                    </div>
                    <p className="font-sans text-sm text-white font-bold group-hover:text-brand-accent transition-colors">
                      {c.title[locale]}
                    </p>
                    {c.description && <p className="font-sans text-xs text-gray-400 mt-1">{c.description[locale]}</p>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="font-sans text-xs text-gray-600 tracking-widest">END OF FLOOR 07</p>
        </div>
      </div>
    </section>
  )
}

export default Floor07
