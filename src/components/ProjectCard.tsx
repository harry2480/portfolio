'use client'

import React from 'react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
}

/**
 * ProjectCard Component
 * OFFICE フロアで使用するプロジェクトカード
 */
export function ProjectCard({ title, description, image, technologies }: ProjectCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
      </div>
      <h3 className="font-bebas text-3xl mb-2 text-white">{title}</h3>
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
    </article>
  )
}
