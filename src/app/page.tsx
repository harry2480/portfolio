import { Building } from '../components/Building' 

interface FloorData {
  id: number;
  label: string;
  bgImage: string;
  buildContent: (handleFloorSelect: (floor: number) => void) => React.ReactNode;
}

export const buildFloors = (_handleFloorSelect: (floor: number) => void): FloorData[] => [
  {
    id: 1,
    label: 'ENTRANCE',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    buildContent: (handleFloorSelect) => (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center mb-12">
            <div className="reveal-text-container">
              <h2 className="reveal-text font-bebas text-[15vw] md:text-[10rem] leading-[0.8] tracking-tight mix-blend-overlay opacity-80 text-white">
                TOKYO<br />HQ
              </h2>
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="font-sans text-xs tracking-[0.5em] text-gray-400 reveal-item opacity-0 translate-y-4">
                EST. 1998 / MINATO-KU
              </p>
              <div className="w-20 h-[1px] bg-white/30 reveal-item opacity-0 scale-x-0"></div>
            </div>
          </div>

          <div className="access-card w-full max-w-md p-8 rounded-sm backdrop-blur-md reveal-item opacity-0 translate-y-8 transform transition-all duration-500 border border-white/40 hover:border-white/60 group cursor-pointer relative" onClick={() => handleFloorSelect(2)}>
            <div className="flex justify-between items-start mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-sans text-gray-400 tracking-widest mb-1">VISITOR PASS</span>
                <span className="font-bebas text-2xl tracking-wide text-white">ACCESS GRANTED</span>
              </div>
              <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div className="font-mono text-xs text-gray-500">ID: GUEST-001</div>
              <div className="flex items-center gap-3">
                <span className="touch-to-enter font-bebas text-xl tracking-widest">TOUCH TO ENTER</span>
                <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
            
            <div className="scan-line"></div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] tracking-widest font-sans">SCROLL TO EXPLORE</span>
            <div className="w-[1px] h-12 bg-gray-600"></div>
          </div>
        </div>

        <div className="relative z-10 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 min-h-[50vh] py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-bebas text-4xl mb-8 text-gray-300">BUILDING GUIDE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm text-gray-400 leading-relaxed">
              <div>
                <p className="mb-4">
                  本サイトは、Webエンジニアのポートフォリオを「架空の自社ビル」に見立てて構成しています。
                  エレベーターを使って各フロア（ページ）へアクセスしてください。
                </p>
                <p>
                  圧倒的な没入感と、機能的なアクセシビリティの両立を目指しました。
                  スクロールすることで、建物の詳細情報や隠されたコンテンツを発見できます。
                </p>
              </div>
              <div>
                <ul className="space-y-4 border-l border-white/20 pl-6">
                  <li>
                    <span className="block text-white font-bold text-xs mb-1">FLOOR 02: OFFICE</span>
                    制作実績・プロジェクトの展示エリア
                  </li>
                  <li>
                    <span className="block text-white font-bold text-xs mb-1">FLOOR 03: LAB</span>
                    技術スタック・スキルの保管庫
                  </li>
                  <li>
                    <span className="block text-white font-bold text-xs mb-1">FLOOR 05: RECEPTION</span>
                    お問い合わせ・コンタクトフォーム
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 2,
    label: 'OFFICE',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    buildContent: () => (
      <div className="pt-32 px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
          <h2 className="font-bebas text-6xl lg:text-8xl">OFFICE / WORKS</h2>
          <span className="font-sans text-xs tracking-widest mb-4">制作実績エリア</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {[
            {
              title: 'NEO COMMERCE PLATFORM',
              desc: '大規模ECサイトのリニューアルプロジェクト。ヘッドレスコマースアーキテクチャを採用し、フロントエンドのパフォーマンスを劇的に改善。',
              img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
              tags: ['NEXT.JS', 'SHOPIFY'],
            },
            {
              title: 'CORPORATE BRANDING',
              desc: 'テック企業のブランディングサイト。WebGLを用いたデータビジュアライゼーションを実装し、企業の先進性を表現。',
              img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
              tags: ['THREE.JS', 'WEBGL'],
            },
            {
              title: 'MUSIC FESTIVAL 2024',
              desc: '大型音楽フェスの特設サイト。チケット販売システムとの連携および、タイムテーブルのリアルタイム更新機能を実装。',
              img: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2070&auto=format&fit=crop',
              tags: ['VUE.JS', 'FIREBASE'],
            },
            {
              title: 'AI DASHBOARD UI',
              desc: 'AI解析ツールの管理画面UIデザインおよび実装。複雑なパラメータ設定を直感的に操作できるインターフェースを設計。',
              img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
              tags: ['REACT', 'TAILWIND'],
            },
          ].map((project, i) => (
            <article key={i} className={i % 2 === 1 ? 'group mt-0 md:mt-20' : 'group'}>
              <div className="relative aspect-video bg-gray-900 border border-white/10 overflow-hidden mb-4">
                <img src={project.img} alt={project.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              </div>
              <h3 className="font-bebas text-3xl mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">{project.desc}</p>
              <div className="mt-4 flex gap-2">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] border border-white/30 px-2 py-1">
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
    ),
  },
  {
    id: 3,
    label: 'LAB',
    bgImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
    buildContent: () => (
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
          END OF FLOOR 03
        </div>
      </div>
    ),
  },
  {
    id: 4,
    label: 'ARCHIVE',
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
    buildContent: () => (
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
          END OF FLOOR 04
        </div>
      </div>
    ),
  },
  {
    id: 5,
    label: 'RECEPTION',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    buildContent: () => (
      <div className="pt-32 px-6 pb-20 max-w-4xl mx-auto h-full flex flex-col justify-center">
        <div className="border-2 border-white p-2 relative">
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050505] rounded-full border-r-2 border-white"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050505] rounded-full border-l-2 border-white"></div>

          <div className="border border-white/20 p-8 lg:p-12 bg-[#101010]">
            <h2 className="font-bebas text-6xl mb-2 text-brand-accent">RECEPTION</h2>
            <form className="space-y-6 mt-8">
              <input type="text" className="w-full bg-black border border-white/30 p-3 text-white font-sans" placeholder="NAME" required />
              <input type="email" className="w-full bg-black border border-white/30 p-3 text-white font-sans" placeholder="EMAIL" required />
              <textarea rows={4} className="w-full bg-black border border-white/30 p-3 text-white font-sans" placeholder="MESSAGE" required />
              <button type="button" className="w-full bg-white text-black font-bebas text-xl py-4 hover:bg-brand-accent hover:text-white transition-colors">
                SEND
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center text-xs text-gray-600 font-mono">
          END OF FLOOR 05
        </div>
      </div>
    ),
  },
];

// prevent unused local variable errors for buildFloors
void buildFloors;

export default function Home() {
  return <Building />
} 
