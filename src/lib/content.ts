/**
 * コンテンツローダー（MDX/Markdown パース処理）
 * 
 * `content/` ディレクトリ内の Markdown/MDX ファイルを自動検知・パースし、
 * ブログ記事・プロジェクトデータとして提供します。
 * 
 * Velite によるビルド時パース + TypeScript 型生成を前提とします。
 */

export interface PostMetadata {
  title: string
  description: string
  date: string
  tags: string[]
  author?: string
  published: boolean
  draft?: boolean
}

export interface Post extends PostMetadata {
  slug: string
  content: string
  readingTime: number
}

/**
 * 記事の文字数から読了時間（分）を計算
 * 平均読速: 約 400 文字/分（日本語テキスト）
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 400
  const wordCount = content.length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // 最小1分
}

/**
 * Velite でパースされた post から slug を抽出
 * 例: content/posts/my-article.md → my-article
 */
export function extractSlug(filePath: string): string {
  const match = filePath.match(/posts[/\\]([^/\\]+)\.(md|mdx)$/)
  return match ? match[1] : ''
}

/**
 * ダミー: Velite パース済みデータを想定
 * 本運用時には、Velite の生成型から import して使用
 */
export function getDummyPosts(): Post[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Next.js で始めるモダン Web 開発',
      description: '次世代 React フレームワーク Next.js の基本を学ぶ',
      date: '2025-01-20',
      tags: ['Next.js', 'React', 'Web開発'],
      author: 'ハリー',
      published: true,
      content: `# Next.js で始めるモダン Web 開発

Next.js は Vercel が開発した React フレームワークで、以下の特徴があります。

## 特徴

- **ファイルベースルーティング:** ディレクトリ構造がそのまま URL に
- **SSG/SSR:** ビルド時静的生成またはリクエスト時ビルドを選択可能
- **高速化:** 自動コード分割、イメージ最適化
- **TypeScript サポート:** デフォルトで完全対応

## インストール

\`\`\`bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
\`\`\`

詳細は [Next.js 公式ドキュメント](https://nextjs.org/docs) を参照してください。
`,
      readingTime: 3,
    },
    {
      slug: 'tailwind-css-tips',
      title: 'Tailwind CSS 実践 Tips',
      description: 'Utility-first CSS フレームワークの効果的な使い方',
      date: '2025-01-15',
      tags: ['Tailwind CSS', 'CSS', 'Design'],
      author: 'ハリー',
      published: true,
      content: `# Tailwind CSS 実践 Tips

Tailwind CSS は Utility-first の CSS フレームワークです。

## ポイント

1. **クラス名は意図的に:** \`flex\`, \`justify-center\` など意味のある名前
2. **カスタムテーマ活用:** \`tailwind.config.js\` で色・フォント・サイズをカスタマイズ
3. **@apply で再利用:** 複数で使う場合は \`@apply\` で新規クラス定義

\`\`\`css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
\`\`\`

効率的な UI 構築が可能です。
`,
      readingTime: 2,
    },
  ]
}

/**
 * すべての記事を取得（公開済みのみ）
 */
export async function getAllPosts(): Promise<Post[]> {
  // 本運用時: Velite の生成型から import
  // import { posts } from '#content'
  const allPosts = getDummyPosts()
  return allPosts.filter((post) => post.published && !post.draft)
}

/**
 * 特定の slug の記事を取得
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}

/**
 * タグ別に記事をグループ化
 */
export function groupPostsByTag(posts: Post[]): Record<string, Post[]> {
  const grouped: Record<string, Post[]> = {}
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!grouped[tag]) grouped[tag] = []
      grouped[tag].push(post)
    })
  })
  return grouped
}
