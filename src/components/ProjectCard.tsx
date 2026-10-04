'use client'

import React, { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  url?: string
  index?: number
  badges?: string[]
}

/**
 * ProjectCard Component
 * OFFICE フロアで使用するプロジェクトカード / Works ページのGitHubプロジェクト表示
 */
export function ProjectCard({ title, description, image, technologies, url, index = 0, badges = [] }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  const content = (
    <>
      <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden mb-4">
        <img
          src={imageError ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect fill="%23333" width="400" height="225"/%3E%3C/svg%3E' : image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          onError={() => setImageError(true)}
        />
      </div>
      {badges.length > 0 && (
        <div className="mb-2 flex gap-2 flex-wrap">
          {badges.map((badge) => (
            <span key={badge} className="text-[10px] font-mono uppercase tracking-widest rounded-full border border-brand-accent/60 px-2 py-0.5 text-brand-accent">
              {badge}
            </span>
          ))}
        </div>
      )}
      <h3 className="font-oswald text-3xl mb-2 text-white group-hover:text-gray-300 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 font-sans leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {technologies.map((tech) => (
          <span key={tech} className="text-[10px] border border-white/30 px-2 py-1 text-white/70 hover:text-white hover:border-white/70 transition-colors">
            {tech}
          </span>
        ))}
      </div>
    </>
  )

  const className = `group ${index % 2 === 1 ? 'mt-0 md:mt-20' : ''}`

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <article className={className}>
          {content}
        </article>
      </a>
    )
  }

  return <article className={className}>{content}</article>
}
