# harry2480.dev

## 技術スタック

- **フレームワーク:** Next.js 16 (App Router)
- **言語:** TypeScript 5.x
- **スタイリング:** Tailwind CSS v4 + CSS トークン (`@harry4869/css-tokens`)
- **コンテンツ:** Markdown/MDX
- **アニメーション:** Framer Motion, Lenis (スムーススクロール)
- **UI コンポーネント:** Radix UI, shadcn/ui
- **コマンドパレット:** cmdk
- **静的ホスティング:** Cloudflare

## プロジェクト構造

```
src/
  ├── app/
  │   ├── page.tsx              # トップページ (Bento Grid)
  │   ├── layout.tsx            # Root レイアウト
  │   └── blog/
  │       ├── page.tsx          # ブログ一覧
  │       ├── layout.tsx        # ブログレイアウト
  │       └── [slug]/
  │           └── page.tsx      # ブログ詳細 (動的)
  ├── components/
  │   ├── BentoCard.tsx         # Bento Grid カード
  │   ├── ProjectCard.tsx       # プロジェクトカード
  │   ├── CommandPalette.tsx    # コマンドパレット (Ctrl+K)
  │   ├── SmoothScrollProvider.tsx # スムーススクロール (Lenis)
  │   ├── TableOfContents.tsx   # 目次 (TOC)
  │   └── mdx/
  │       ├── Message.tsx       # MDX カスタムコンポーネント
  │       ├── CodeBlock.tsx     # コード表示
  │       └── index.ts
  ├── lib/
  │   ├── content.ts            # コンテンツローダー
  │   └── utils.ts              # ユーティリティ
  └── styles/
      └── globals.css           # グローバルスタイル
content/
  └── posts/
      └── sample-blog.mdx       # テスト記事
.github/
  └── workflows/
      └── deploy.yml            # GitHub Actions ワークフロー
```

## 主な機能

- **Bento Grid レイアウト:** プロフィール・プロジェクト・ブログを視覚的に配置
- **ブログシステム:** MDX で記事作成、自動読了時間計算
- **コマンドパレット:** `Ctrl+K` でナビゲーション・検索
- **スムーススクロール:** 高級感のある操作感 (Lenis)
- **目次 (TOC):** スクロール位置に応じたハイライト
- **静的生成:** `next export` で完全静的出力、GitHub Pages 対応
- **CI/CD:** GitHub Actions で自動ビルド・デプロイ

## セットアップ

### 前提条件

- Node.js 18.x 以上

### インストール

```bash
npm install
```

### 開発

```bash
npm run dev
```

http://localhost:3000 で起動

**ローカル開発メモ**

- 本リポジトリでは `src/app/layout.tsx` に `CodeBackground` をグローバルで挿入しています。全ページで白い波線アニメーションが表示されるため、負荷や表示を抑えたい場合は当該行をコメントアウトしてください。
- TypeScript 設定については `tsconfig.json` に `ignoreDeprecations: "6.0"` を追加しており、ローカルで起きる非推奨警告を抑制しています。

### ビルド

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが生成されます。

## ブログ記事の追加

`content/posts/` ディレクトリに `.mdx` ファイルを追加します。

**フロントマター例:**

```mdx
---
title: '記事タイトル'
description: '概要'
date: '2025-01-25'
tags: ['tag1', 'tag2']
published: true
---

# 記事本文
```

## 🚀 デプロイ

### Cloudflare Pages へのデプロイ

1. Cloudflare にサインアップし、アカウントを作成します。
2. Cloudflare Pages で「Create a project」を選び、GitHub リポジトリを接続します。
3. ビルド設定は次の通りにします（このリポジトリの既存設定に合わせて調整してください）：
  - Build command: `npm run build`
  - Build output directory: `out`
  - Framework preset: `None`（Next.js を `next export` で静的出力している場合）
4. 環境変数やシークレットが必要なら、Cloudflare Pages の UI で追加します。
5. Git の push によって自動でプレビューと本番デプロイが実行されます。

補足:
- Next.js を Cloudflare のエッジ上で動的に動かしたい場合は `@cloudflare/next-on-pages` などのアダプターを検討してください（設定が複雑になるため、今回は静的 `next export` を想定した手順を記載しています）。

**手動ビルド（ローカルで静的ファイルを作る）**

```bash
npm run build
# out/ ディレクトリを Pages にアップロードするか、そのまま Cloudflare がビルドできるようにセットします
```

## 性能目標

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- ページロード時間: <1s (SSG)

## 今後の改善予定

- [ ] OGP 画像の自動生成
- [ ] RSS フィード対応
- [ ] Sitemap 自動生成
- [ ] より詳細なアナリティクス
- [ ] ダークモードの完全対応

## ライセンス

MIT License
