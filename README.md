# DEV_CORE - ポートフォリオ＆技術ブログ

モダン Web 技術と美しい UI/UX デザインを融合させたポートフォリオサイト。

## 🚀 技術スタック

- **フレームワーク:** Next.js 16 (App Router)
- **言語:** TypeScript 5.x
- **スタイリング:** Tailwind CSS v4 + CSS トークン (`@harry4869/css-tokens`)
- **コンテンツ:** Markdown/MDX
- **アニメーション:** Framer Motion, Lenis (スムーススクロール)
- **UI コンポーネント:** Radix UI, shadcn/ui
- **コマンドパレット:** cmdk
- **静的ホスティング:** GitHub Pages

## 📁 プロジェクト構造

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

## ✨ 主な機能

- ✅ **Bento Grid レイアウト:** プロフィール・プロジェクト・ブログを視覚的に配置
- ✅ **ブログシステム:** MDX で記事作成、自動読了時間計算
- ✅ **コマンドパレット:** `Ctrl+K` でナビゲーション・検索
- ✅ **スムーススクロール:** 高級感のある操作感 (Lenis)
- ✅ **目次 (TOC):** スクロール位置に応じたハイライト
- ✅ **静的生成:** `next export` で完全静的出力、GitHub Pages 対応
- ✅ **CI/CD:** GitHub Actions で自動ビルド・デプロイ

## 🛠️ セットアップ

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

### ビルド

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが生成されます。

## 📝 ブログ記事の追加

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

### GitHub Pages へのデプロイ

1. GitHub にリポジトリを作成
2. リポジトリの **Settings → Pages** で以下を設定：
   - Source: **GitHub Actions**
3. `main` ブランチに `push` すると自動デプロイが開始されます

**手動デプロイ:**

```bash
npm run build
# out/ ディレクトリを GitHub Pages にアップロード
```

## 📊 性能目標

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- ページロード時間: <1s (SSG)

## 🛠️ 今後の改善予定

- [ ] OGP 画像の自動生成
- [ ] RSS フィード対応
- [ ] Sitemap 自動生成
- [ ] より詳細なアナリティクス
- [ ] ダークモードの完全対応

## 📄 ライセンス

MIT License
