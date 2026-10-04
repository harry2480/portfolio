import type { Hackathon, OssContribution } from '@/types/records'

export const hackathons: Hackathon[] = [
  {
    name: {
      ja: 'AIエージェント社会シミュレーションハッカソン Vol.2',
      en: 'AI Agent Social Simulation Hackathon Vol.2',
      zh: 'AI 智能体社会模拟黑客松 Vol.2',
      ko: 'AI 에이전트 사회 시뮬레이션 해커톤 Vol.2',
    },
    date: '2026-08-15',
    product: 'SLEEP CITY',
    description: {
      ja: '睡眠不足が交通・労働・物流・家庭を介して他者へ伝播する「Sleep Cascade」を観測する AI マルチエージェント都市シミュレーション。物理法則は決定論的なドメインロジック、Agent の意思決定のみを AI が担い、シード固定で実験を再現できる。',
      en: 'An AI multi-agent city simulation that observes the "Sleep Cascade": sleep deprivation spreading to others through traffic, work, logistics, and households. The physics is deterministic domain logic, AI handles only the agents’ decision-making, and experiments are reproducible with a fixed seed.',
      zh: '一个 AI 多智能体城市模拟，用于观测睡眠不足通过交通、劳动、物流和家庭传播给他人的“Sleep Cascade”现象。物理规律由确定性的领域逻辑实现，AI 只负责 Agent 的决策，固定随机种子即可复现实验。',
      ko: '수면 부족이 교통・노동・물류・가정을 거쳐 타인에게 전파되는 ‘Sleep Cascade’를 관측하는 AI 멀티 에이전트 도시 시뮬레이션. 물리 법칙은 결정론적 도메인 로직이 담당하고 Agent의 의사결정만 AI가 맡으며, 시드를 고정해 실험을 재현할 수 있다.',
    },
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Vercel AI SDK', 'OpenRouter'],
    links: [
      { label: 'Web', url: 'https://sleep-city.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/harry2480/sleep-city' },
      { label: 'Event', url: 'https://hackathon.automata-lab.jp/' },
    ],
  },
  {
    name: {
      ja: 'SPAJAM 2026 予選',
      en: 'SPAJAM 2026 Preliminary Round',
      zh: 'SPAJAM 2026 预选赛',
      ko: 'SPAJAM 2026 예선',
    },
    date: '2026-08-08',
    product: 'CANBLE',
    description: {
      ja: '「宣言すると、みんなが達成できるかどうかに賭ける」プロダクト。宣言・審査・オッズ・賭場・結果までを一つの賭場の世界観で統一した、操作可能なモバイルアプリのモック。',
      en: 'A product where "you make a declaration, and everyone bets on whether you will achieve it." An interactive mobile app mock that unifies declarations, review, odds, the betting floor, and results under a single gambling-den world.',
      zh: '一款“立下目标后，大家来押注你能否达成”的产品。这是一个可操作的移动应用原型，把立目标、审核、赔率、赌场到结果的全过程统一在同一个赌场世界观中。',
      ko: '‘선언하면 모두가 달성할 수 있을지에 베팅하는’ 프로덕트. 선언・심사・배당률・도박장・결과까지를 하나의 도박장 세계관으로 통일한, 조작 가능한 모바일 앱 목업.',
    },
    tags: ['React', 'TypeScript', 'Tauri', 'Rust'],
    links: [
      { label: 'GitHub', url: 'https://github.com/harry2480/spajam-canble' },
      { label: 'Event', url: 'https://spajam.jp/' },
    ],
  },
]

export const ossContributions: OssContribution[] = [
  {
    repo: 'team-mirai/mirai-gikai',
    title: {
      ja: 'ふりがな表示時の引用クラッシュを防ぐ',
      en: 'Prevent quote crashes when furigana is shown',
      zh: '防止显示假名注音时引用部分崩溃',
      ko: '후리가나 표시 시 인용 크래시 방지',
    },
    url: 'https://github.com/team-mirai/mirai-gikai/pull/965',
    date: '2026-08-28',
    description: {
      ja: '本番で発生していた、ふりがな ON 時に引用付き議案ページが表示されなくなる不具合を修正。Rubyful の DOM 差し替えと ResizeObserver の競合が原因で、切り詰めを描画前に確定する純粋関数へ置き換え、回帰テスト 29 件を追加。',
      en: 'Fixed a production bug where bill pages containing quotes failed to render when furigana was turned on. The cause was a conflict between Rubyful’s DOM replacement and ResizeObserver; replaced the logic with a pure function that settles truncation before rendering and added 29 regression tests.',
      zh: '修复了生产环境中开启假名注音时，带引用的议案页面无法显示的问题。原因是 Rubyful 的 DOM 替换与 ResizeObserver 发生冲突；改为在渲染前确定截断结果的纯函数，并新增 29 个回归测试。',
      ko: '프로덕션에서 발생하던, 후리가나를 켜면 인용이 포함된 의안 페이지가 표시되지 않는 버그를 수정. Rubyful의 DOM 교체와 ResizeObserver의 충돌이 원인이었으며, 렌더링 전에 잘라내기를 확정하는 순수 함수로 교체하고 회귀 테스트 29건을 추가.',
    },
  },
]
