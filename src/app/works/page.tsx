import { ProjectCard } from '@/components/ProjectCard'
import repos from '@/data/repos.json'

export const metadata = {
  title: 'Works | Portfolio Building',
  description: 'Works and projects showcase'
}

export default function WorksPage() {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">Works</h2>
          <span className="font-sans text-xs tracking-widest mb-4">作品一覧</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {repos.map((project, i) => {
            const tags = [
              ...(project.language ? [project.language] : []),
              ...project.topics.map((t: string) => t.toUpperCase()),
            ].slice(0, 3)

            return (
              <ProjectCard
                key={project.id}
                title={project.name}
                description={project.description}
                image={project.ogImage}
                technologies={tags}
                url={project.url}
                index={i}
              />
            )
          })}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF WORKS ({repos.length} projects)
        </div>
      </div>
    </section>
  )
}
