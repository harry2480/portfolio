# portfolio AIエージェントへの指針 (AGENTS.md)

このファイルは、`harry2480.dev` ポートフォリオリポジトリでコードを操作する際の AI エージェントへのルールおよび指針を提供します。

**プロジェクト概要**: ビル / エレベーターをモチーフにした個人ポートフォリオサイト。Floor01〜Floor06 の各フロアに About / Skill / Works / Office / Blog / GitHub PRs を配置し、エレベーター演出と GSAP アニメーションで遷移する。Next.js 14 (App Router) を **静的エクスポート（`output: 'export'`）** でビルドし、Cloudflare Pages にデプロイ。動的データは Cloudflare Pages Functions で提供する。

## 必須ルール

### 静的エクスポートを壊さない

`next.config.js` の `output: 'export'` は **必ず維持する**。これを外すと Cloudflare Pages の `out/` 出力前提のデプロイが壊れる。

- `npm run build` は `out/` ディレクトリに静的ファイルを生成する
- 静的エクスポートで使えない Next.js 機能（Server Actions、ISR、middleware、画像最適化の動的モード、`dynamic = 'force-dynamic'` 等）は採用しない
- Route Handler / API Route（`src/app/api/**/route.ts`）は **追加しない**。静的エクスポートでは無視され、本番では動かない

### 動的 API は Cloudflare Pages Functions に実装

ランタイムでデータを取得する必要がある場合は、`functions/api/<name>.ts` に Cloudflare Pages Functions として実装する。

```ts
/// <reference types="@cloudflare/workers-types" />
export const onRequestGet: PagesFunction<Env> = async ({ env }) => { ... }
```

- 既存例: `functions/api/github-prs.ts`（GitHub Search API でユーザーの PR を取得し、5 分のメモリキャッシュで返す）
- フロントからは `fetch('/api/<name>')` でアクセスする（Cloudflare Pages がルーティング）
- Functions 専用の TS 設定は `functions/tsconfig.json`（DOM 型と衝突するため `lib: ["ES2022"]` のみ、`types: ["@cloudflare/workers-types"]`）
- 共有型は `src/types/**` から相対パスで import（`functions/tsconfig.json` の `include` に含めてある）
- シークレット（`GITHUB_TOKEN` 等）は Cloudflare Pages の環境変数に設定し、`env.GITHUB_TOKEN` でアクセス

### フロア追加時のナビゲーション同期

フロアは複数のハードコードされた配列に分散している。1 箇所でも漏れると遷移・表示が壊れるため、フロアを増減する際は **すべて** 更新すること。

- `src/components/FloorsLayout.tsx`（フロア切替ロジック）
- `src/components/FloorIndicator.tsx` / `FloorSidebar.tsx`（左サイドのフロアセレクタ）
- `src/components/GlobalFloorLinks.tsx`（GSAP エレベーター演出付きグローバルナビ）
- `src/components/Menu.tsx` / `MenuOverlay.tsx`（フルスクリーンメニュー）
- `src/components/floors/Floor0X.tsx`（実コンポーネント）
- `src/app/<route>/page.tsx`（ルート単位ページが存在する場合）

ラベル表記は `"0X <Name>"`（例: `"06 GitHub"`）で統一。

### 説明・計画は日本語

ユーザーへの応答、ExitPlanMode の plan 内容、コミットメッセージ本文、PR description、ドキュメントはすべて日本語で書く（ユーザー設定）。コード内のコメントは最小限に留め、必要な場合のみ日本語で書いてよい。

### ブランチ運用 / PR 作成ルール

- 新しい作業ブランチは **必ず `develop` から作成する**（`main` から切らない）
- PR は `develop` をベースに作成する（hotfix など `main` 直行が必要な場合のみユーザーに確認の上で例外）
- `main` および `develop` への **直接 push は禁止**（force push を含む）。変更は必ず作業ブランチ → PR → マージで反映する
- ブランチ作成手順例:

```bash
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c <type>/<short-description>   # 例: feat/floor07-contact, fix/elevator-animation
```

- ブランチ名はプレフィックス（`feat/` `fix/` `chore/` `refactor/` `docs/`）+ 内容を表す短い識別子で揃える

## 作業ルール

### コード変更前の確認

変更前にビルドと型チェックがクリーンに通る状態であることを確認する。

```bash
npm run build      # fetch-repos → next build（out/ を生成）
npx tsc --noEmit   # 型チェック（必要に応じて）
```

`npm run dev` / `npm run build` の前段で `scripts/fetch-repos.js` が走り、`src/data/repos.json`（Works フロアで使う GitHub リポジトリデータ）を更新する。ネットワーク不可な環境では既存 JSON を再利用する設計になっているか確認すること。

### Cloudflare Pages Functions の検証

Functions のローカル検証は `wrangler pages dev out` を使う。型チェックは `functions/tsconfig.json` を指定して行う。

```bash
npm run build
npx wrangler pages dev out         # functions/ も自動で配信される
npx tsc -p functions/tsconfig.json --noEmit
```

### ブログ記事

記事は `src/content/blog/` 配下に Markdown で追加する。フロントマターは `gray-matter` でパースされ、`src/lib/content.ts` 経由でロードされる。`react-markdown` + `remark-gfm` + `react-syntax-highlighter` でレンダリング。

### 静的アセット

- `public/` 配下に置いたファイルは `/` ルートで配信される
- ファビコン関連 SVG は `public/` のルートに配置済み（複数バリエーション）

### Push 前のチェック

`git push` する前に以下を確認する。

1. `npm run build` が成功し `out/` が生成される
2. 型エラーがない（`npx tsc --noEmit`）
3. フロアを追加・削除した場合、上記「フロア追加時のナビゲーション同期」の全箇所を更新済み
4. Next.js API Route を追加していない（Cloudflare Pages Functions に置いた）
5. `next.config.js` の `output: 'export'` を残してある

## 開発コマンド

```bash
npm run dev          # fetch-repos → next dev（http://localhost:3000）
npm run build        # fetch-repos → next build（out/ に静的出力）
npm run start        # 本番モードで起動（通常は使わない、Cloudflare Pages を使う）
npm run lint         # ESLint
npm run fetch-repos  # GitHub からリポジトリデータを取得して src/data/repos.json を更新
```

Cloudflare Pages のローカル動作確認:

```bash
npm run build && npx wrangler pages dev out
```

## アーキテクチャ

**設計思想**: ビル / エレベーターのメタファーで縦移動するフロア群。各フロアは独立した React コンポーネントで、`FloorsLayout` がスクロール / クリックでアクティブフロアを切り替え、GSAP でエレベーター演出を加える。

**主要技術スタック**:

- **フレームワーク**: Next.js 14 App Router（`output: 'export'` 静的サイト）
- **言語**: TypeScript 5.x
- **スタイリング**: Tailwind CSS 3.x
- **UI**: Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slot`) + shadcn/ui スタイル
- **アニメーション**: GSAP（エレベーター演出）、Lenis（スムーススクロール）
- **コンテンツ**: Markdown（`gray-matter` + `react-markdown` + `remark-gfm`）
- **動的 API**: Cloudflare Pages Functions（`functions/api/*.ts`）
- **ホスティング**: Cloudflare Pages（ビルド出力 `out/`）

## ディレクトリ構造

```text
src/
├── app/
│   ├── layout.tsx              # Root レイアウト（CodeBackground 等のグローバル要素）
│   ├── page.tsx                # トップ（ビル全景 / Floor01）
│   ├── about/                  # Floor01
│   ├── skill/                  # Floor02
│   ├── works/                  # Floor03
│   ├── office/                 # Floor04
│   ├── blog/                   # Floor05（ブログ一覧 + [slug] 詳細）
│   ├── posts/                  # ブログ補助ルート
│   └── github/                 # Floor06（GitHub PRs 表示）
├── components/
│   ├── FloorsLayout.tsx        # フロア切替ロジック（要同期更新）
│   ├── FloorIndicator.tsx      # 左サイド インジケータ（要同期更新）
│   ├── FloorSidebar.tsx        # 左サイド セレクタ（要同期更新）
│   ├── GlobalFloorLinks.tsx    # グローバルナビ + GSAP（要同期更新）
│   ├── Menu.tsx / MenuOverlay.tsx  # フルスクリーンメニュー（要同期更新）
│   ├── ElevatorDoors.tsx / GlobalElevatorDoors.tsx
│   ├── floors/
│   │   ├── Floor01.tsx 〜 Floor06.tsx
│   ├── ui/                     # shadcn/ui（button, card, dialog, input）
│   └── （その他: Header, Building, ProjectCard, CodeBackground, etc.）
├── content/blog/               # Markdown 記事
├── data/repos.json             # fetch-repos.js が生成（gitignore 対象なら除外）
├── hooks/useFloorNavigation.ts # フロア間遷移フック
├── lib/
│   ├── animations.ts           # GSAP 共通定義
│   ├── content.ts              # Markdown ローダー
│   └── utils.ts                # cn() などの汎用
├── styles/globals.css          # Tailwind エントリ
└── types/github.ts             # PR / GitHub 関連型（Functions と共有）

functions/
├── api/
│   └── github-prs.ts           # GitHub Search API ラッパー（Cloudflare Pages Functions）
└── tsconfig.json               # Functions 専用 TS 設定（@cloudflare/workers-types）

scripts/
└── fetch-repos.js              # ビルド時に GitHub リポジトリデータを取得

public/                         # 静的アセット（ファビコン各種、画像等）
out/                            # ビルド出力（gitignore）
docs/                           # 実装計画ドキュメント
```

## デプロイ

Cloudflare Pages の設定:

- Build command: `npm run build`
- Build output directory: `out`
- Framework preset: `None`
- 環境変数: `GITHUB_TOKEN`（Floor06 の Functions が利用）
- `functions/` ディレクトリは Cloudflare Pages が自動的に検出してエッジで実行

`main` ブランチへのマージで本番デプロイ、それ以外のブランチへの push でプレビューデプロイが走る。
