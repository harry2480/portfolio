export const metadata = {
  title: 'Archive | Portfolio Building',
  description: 'About and experience'
}

export default function ArchivePage() {
  return (
    <section className="floor-container">
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-bebas text-6xl lg:text-8xl">ARCHIVE / ABOUT</h2>
          <span className="font-sans text-xs tracking-widest mb-4">経歴・自己紹介</span>
        </div>

        <div className="space-y-16 font-sans text-sm text-gray-400 leading-relaxed">
          <div>
            <h3 className="font-bebas text-2xl text-white mb-4">CONCEPT</h3>
            <p>
              Webエンジニアとしての私の価値は、単なるコード実装ではなく、
              ビジネスと技術の仲介者として機能することにあります。
              デザイン思考、ユーザー中心主義、そして最新の技術トレンドを
              組み合わせた、包括的なソリューション提供を得意としています。
            </p>
          </div>

          <div>
            <h3 className="font-bebas text-2xl text-white mb-4">EXPERIENCE</h3>
            <div className="space-y-6 border-l border-white/20 pl-6">
              <div>
                <p className="text-white font-bold text-xs mb-1">2022 - PRESENT</p>
                <p className="text-white">Senior Frontend Engineer @ Tech Company</p>
                <p className="text-xs mt-2">React, TypeScript, Design Systems の構築と運用</p>
              </div>
              <div>
                <p className="text-white font-bold text-xs mb-1">2020 - 2022</p>
                <p className="text-white">Full Stack Developer @ Startup</p>
                <p className="text-xs mt-2">Next.js, Node.js, AWS を用いた MVP 構築</p>
              </div>
              <div>
                <p className="text-white font-bold text-xs mb-1">2018 - 2020</p>
                <p className="text-white">Junior Web Developer @ Agency</p>
                <p className="text-xs mt-2">WordPress, PHP, jQuery での Web 制作</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF ARCHIVE
        </div>
      </div>
    </section>
  )
}
