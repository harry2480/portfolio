import { WorksList } from '@/components/WorksList'

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

        <WorksList />
      </div>
    </section>
  )
}
