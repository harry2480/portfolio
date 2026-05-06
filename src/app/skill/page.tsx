export const metadata = {
  title: 'Skill | Portfolio Building',
  description: 'Skills and technology stack'
}

export default function SkillPage() {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-oswald text-6xl lg:text-8xl">Skills</h2>
          <span className="font-sans text-xs tracking-widest mb-4">技術スタック</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Frontend',
              items: [
                'JavaScript',
                'TypeScript',
                'Swift',
                'HTML5',
                'CSS3',
                'React / Next.js',
                'Vue.js / Nuxt',
                'Electron / Tauri',
                'React Native / Swift UI',
                'TanStack Query',
                'Zustand',
                'Redux Toolkit',
                'Jotai / Recoil / XState',
              ],
            },
            {
              title: 'Backend',
              items: [
                'Node.js (Express, NestJS)',
                'Python (Django, Flask, FastAPI)',
                'PostgreSQL',
                'MySQL / MariaDB',
                'SQLite',
                'Supabase / Firebase',
                'Prisma / Drizzle ORM / TypeORM',
                'Mongoose / Sequelize',
                'REST / GraphQL / WebSocket',
                'OAuth2 / Auth0',
              ],
            },
            {
              title: 'DevOps',
              items: [
                'Vercel',
                'Google Cloud (GCP)',
                'Azure',
                'Cloudflare Pages/Workers',
                'GitHub Actions / CI-CD',
                'Docker / Docker Compose',
                'TDD / DDD',
                'Git / Homebrew / Bash / Zsh',
                'Tmux / VS Code',
              ],
            },
          ].map((skill, i) => (
            <div key={i} className="border border-white/20 p-6 rounded-sm">
              <h3 className="font-oswald text-2xl mb-4 text-white">{skill.title}</h3>
              <ul className="space-y-3 text-sm text-gray-400 font-sans">
                {skill.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF SKILL
        </div>
      </div>
    </section>
  )
}
