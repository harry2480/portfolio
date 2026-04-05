export const metadata = {
  title: 'Lab | Portfolio Building',
  description: 'Skills and technology stack'
}

export default function LabPage() {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-bebas text-6xl lg:text-8xl">LAB / SKILLS</h2>
          <span className="font-sans text-xs tracking-widest mb-4">技術スタック</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'FRONTEND', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Vue 3', 'GSAP / Framer Motion'] },
            { title: 'BACKEND', items: ['Node.js / Express', 'PHP / Laravel', 'Python', 'PostgreSQL / MySQL', 'REST / GraphQL APIs'] },
            { title: 'DEVOPS', items: ['Docker / Docker Compose', 'GitHub Actions', 'Vercel / Railway', 'AWS (EC2, S3, Lambda)', 'Git / CI-CD'] },
          ].map((skill, i) => (
            <div key={i} className="border border-white/20 p-6 rounded-sm">
              <h3 className="font-bebas text-2xl mb-4 text-white">{skill.title}</h3>
              <ul className="space-y-3 text-sm text-gray-400 font-sans">
                {skill.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF LAB
        </div>
      </div>
    </section>
  )
}
