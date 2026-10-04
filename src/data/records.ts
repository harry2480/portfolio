import type { Hackathon, OssContribution } from '@/types/records'

export const hackathons: Hackathon[] = [
  {
    name: 'AIエージェント社会シミュレーションハッカソン Vol.2',
    date: '2026-08-15',
    product: 'SLEEP CITY',
    description:
      '睡眠不足が交通・労働・物流・家庭を介して他者へ伝播する「Sleep Cascade」を観測する AI マルチエージェント都市シミュレーション。物理法則は決定論的なドメインロジック、Agent の意思決定のみを AI が担い、シード固定で実験を再現できる。',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Vercel AI SDK', 'OpenRouter'],
    links: [
      { label: 'Web', url: 'https://sleep-city.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/harry2480/sleep-city' },
      { label: 'Event', url: 'https://hackathon.automata-lab.jp/' },
    ],
  },
  {
    name: 'SPAJAM 2026 予選',
    date: '2026-08-08',
    product: 'CANBLE',
    description:
      '「宣言すると、みんなが達成できるかどうかに賭ける」プロダクト。宣言・審査・オッズ・賭場・結果までを一つの賭場の世界観で統一した、操作可能なモバイルアプリのモック。',
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
    title: 'ふりがな表示時の引用クラッシュを防ぐ',
    url: 'https://github.com/team-mirai/mirai-gikai/pull/965',
    date: '2026-08-28',
    description:
      '本番で発生していた、ふりがな ON 時に引用付き議案ページが表示されなくなる不具合を修正。Rubyful の DOM 差し替えと ResizeObserver の競合が原因で、切り詰めを描画前に確定する純粋関数へ置き換え、回帰テスト 29 件を追加。',
  },
]
