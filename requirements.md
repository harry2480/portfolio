# ポートフォリオサイト 要件定義書 (Ver. 2.0)
# BMSG FES '24 再現 ＆ エレベーター・トランジション プロジェクト

文書バージョン: 2.0  
更新日: 2026/01/25  
作成者: ハリー

## 1. プロジェクト概要

### 1.1 プロジェクト名

「BUILDING ENTRANCE SYSTEM」 — BMSG FES '24 再現＆エレベーター型ポートフォリオ

### 1.2 プロジェクトの目的

**BMSG FES '24 の圧倒的なビジュアル表現をクローンしつつ、自身のポートフォリオとして「エレベーター遷移」という独自のUXを統合。** フロントエンドの演出力とバックエンドの設計力を統合し、フルスタックな技術力を証明する。

### 1.3 コアバリュー

- **没入感**: スクロール連動アニメーションとタイポグラフィの動的制御によるBMSG FES 級の空間体験。
- **シームレス**: 各ページ（フロア）間を垂直移動する「エレベーター型」遷移により、破綻のない物語体験を提供。
- **実用性**: 複数フロア（ルート）に分割し、ページサイズを最適化しながら高度なアニメーションを維持。

### 1.4 対象利用者

- IT企業の採用担当者・テックリード
- ビジュアルと技術力の両立に関心のあるエンジニア
- デザイン・UX意識の高いユーザー

### 1.5 非要件

- SEO対策（ポートフォリオのため優先度低）
- 全情報の1ページ集約（重さを避けるため、複数フロアに分割）

## 2. 技術スタック（確定）

### 2.1 Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: GSAP + ScrollTrigger（本家 BMSG FES 挙動の再現用）
  - エレベーター扉アニメーション、フロア遷移、テキストマスク効果などを GSAP タイムラインで統一管理
- **Smooth Scroll**: Lenis（慣性スクロール、高級感のある操作感）
- **Additional UI**: shadcn/ui（ベースコンポーネント）、lucide-react（アイコン）
- **Content**: MDX / Markdown（記事管理、ブログ記事の構造化）

### 2.2 Backend（オプション・将来対応）

- **Language**: PHP 8.x
- **Framework**: Laravel（予定）
- **Role**: 作品データ、スキル、経歴情報の JSON API 提供；問い合わせフォームのメール送信処理
- **Database**: MySQL / PostgreSQL
- **Deployment**: CloudFree / Render / Railway 等

### 2.3 Infrastructure

- **Frontend Hosting**: Vercel（推奨） / GitHub Pages
- **Backend Hosting**: CloudFree / Render 等
- **CI/CD**: GitHub Actions（自動ビルド・デプロイ）

---

## 3. デザイン・UI/UX詳細

### 3.1 ビジュアルデザイン（BMSG FES 完全踏襲）

#### 色彩計画
- **背景**: `#000000` （ダーク、深い没入感）
- **テキスト**: `#FFFFFF` （高コントラスト、読みやすさ）
- **グリッド・ボーダー**: `#202020` 〜 `#333333` （subtle grid lines）
- **アクセントカラー**: 各フロアごとに異なる色を指定（例: Floor 01 = Red `#FF0033`, Floor 02 = Blue `#0033FF`）

#### タイポグラフィ
- **英字**
  - Heading: `Bebas Neue` または `Archivo Black`（オールキャップス、大文字のみ）
  - 高い視認性と装飾的表現で、BMSG FES らしい大迫力を演出
- **日本語**
  - `Noto Sans JP`（ウェイトを極端に変えて使用: 100 = 極細、900 = 極太）
  - サイズとウェイトの組み合わせで、情報階層を明確にする
- **Monospace**: 技術情報やコード表示用に `Courier New` または `IBM Plex Mono`

#### グリッド・ボーダー
- 画面を格子状に分割するデザイン
- 各要素の境界線を明示し、整理された印象を与える
- CSS Grid + border utilities（Tailwind）で実装

#### 演出効果
- **テキストマスク**: 文字が隙間から現れるようなアニメーション（GSAP による `clipPath` または `mask-image` 操作）
- **Reveal Effect**: スクロール位置に応じた画像のマスク展開
- **グリッドアニメーション**: 背景のグリッドパターンが静かに動く、または点灯するような演出

### 3.2 「エレベーター」画面遷移（コア機能）

#### 遷移フロー
1. **メニューまたはボタンクリック** → ユーザーが新しいフロア（ページ）を選択
2. **Closing Animation** → 左右から扉が閉まるような演出、または現在のページが上に高速スライドアウト
3. **Transit Indicator** → 遷移中、中央に「FLOOR 01 → 02」といったカウントアップ・インジケーターを表示
4. **Opening Animation** → 新しいページが下からスライドインし、各要素が GSAP で順次展開
5. **Complete** → スクロール可能な状態に復帰

#### ルート分割
- `/floor/1` (ENTRANCE)
- `/floor/2` (OFFICE)
- `/floor/3` (LAB)
- `/floor/4` (ARCHIVE)
- `/floor/5` (RECEPTION)
- シングルページの肥大化（重さ）を回避し、各フロアの遷移を軽快にする

---

## 4. 機能要件 (FR)

### FR1: アニメーション・演出（本家再現）

- **FR1.1: Opening Animation** 
  - サイト流入時のロゴアニメーションとローディング画面
  - Reveal Text: テキストが下から浮上するような演出
- **FR1.2: Reveal Effect** 
  - スクロール位置に応じた画像のマスク展開
  - テキストの 1 文字ずつの浮上（stagger effect）
- **FR1.3: Smooth Scroll** 
  - 慣性スクロール（Lenis）により、高級感のある操作感を提供
- **FR1.4: Hover Effects**
  - プロジェクトカードの画像スケーリング、テキストカラー遷移
  - ボタン・リンクのアンダーラインアニメーション

### FR2: ナビゲーション・操作機能

- **FR2.1: 全画面ハンバーガーメニュー**
  - BMSG FES 風のグリッド背景
  - ホバーした階層（ページ）のプレビュー画像が背後にうっすら浮かび上がる演出
  - フロア番号とタイトルの表示
- **FR2.2: フロアインジケーター** 
  - 現在の階層を画面端（左下）に常時表示
  - 各フロア選択で、現在地を即座に更新
- **FR2.3: キーボードショートカット**（任意）
  - 矢印キー / Ctrl+上下 でフロア遷移（デスクトップ向け）

### FR3: コンテンツ構造・ページレイアウト

- **FR3.1: FLOOR 01 - ENTRANCE (Home)**
  - ビル入り口を模した大迫力なメインビジュアル
  - アクセスカード（「TOUCH TO ENTER」CTA）
  - スクロール可能な追加情報エリア（Building Guide）
- **FR3.2: FLOOR 02 - OFFICE (Works)**
  - 制作実績カード（Bento Grid / 2列）
  - 各カード: 画像、プロジェクト名、説明、技術タグ
  - ホバー時の 3D Tilt または拡大演出
- **FR3.3: FLOOR 03 - LAB (Skills)**
  - タイムテーブル風のスキルセット表示
  - 使用技術（PHP, JavaScript, TypeScript, React, Next.js 等）を Skill Item で表現
  - （実装例: `<div class="skill-item">React</div>`）
- **FR3.4: FLOOR 04 - ARCHIVE (About)**
  - コンセプト・自己紹介のテキスト
  - 経歴情報をタイムライン形式で表示
  - タイポグラフィ重視のデザイン
- **FR3.5: FLOOR 05 - RECEPTION (Contact)**
  - チケット購入ページを模した問い合わせフォーム
  - フォーム要素: Name, Email, Message
  - バリデーション、送信後のサンクスメッセージ（静的または API連携）

### FR4: コンテンツ連携（将来対応）

- **FR4.1: 動的実績一覧**（フェーズ 2）
  - `GET /api/works` で Laravel から実績を取得（予定）
  - 画像 URL、使用技術タグ、プロジェクト詳細をフロントで整形
- **FR4.2: フォーム送信**（フェーズ 2）
  - `POST /api/contact` で Laravel へ送信（予定）
  - バリデーション、メール送信、サンクスページ遷移

### FR5: レスポンシブ・操作性

- **FR5.1:** モバイル、タブレット、PC の各画面サイズにおいて、グリッド・フォント・スペーシングが適切にリサイズされること
- **FR5.2:** モバイル時、ハンバーガーメニューが全画面表示され、フロア選択が可能であること
- **FR5.3:** モバイル時、エレベーター遷移をスワイプ操作でも行えるように検討（任意）

---

## 5. 画面構成（フロアマップ）

| Floor | Name | Concept | Key Elements |
|-------|------|---------|--------------|
| 01 | ENTRANCE (Home) | ビル入り口 | メインビジュアル、アクセスカード、Building Guide |
| 02 | OFFICE (Works) | 制作実績展示 | プロジェクトカード (Bento)、技術タグ、ホバーエフェクト |
| 03 | LAB (Skills) | スキルセット | タイムテーブル風、スキル Item、技術スタック |
| 04 | ARCHIVE (About) | 経歴・紹介 | 自己紹介テキスト、経歴タイムライン、タイポグラフィ |
| 05 | RECEPTION (Contact) | 問い合わせ | チケット形式フォーム、送信 UI |

---

## 6. 非機能要件 (NFR)

### NFR1: パフォーマンス

- **Lighthouse Score**: Performance 90+ を目標に
- **各フロアのアセット遅延ロード**: 画像・動画をそのページが呼ばれるまで読み込まない
- **API キャッシュ**（将来）: Laravel API のレスポンスをキャッシュし、高速な遷移を実現

### NFR2: レスポンス & 互換性

- **モバイルファースト**: iOS Safari, Android Chrome での動作確認
- **デスクトップ**: Chrome, Firefox, Safari での動作確認
- **アニメーション フォールバック**: `prefers-reduced-motion` に対応

### NFR3: メンテナンス性

- **コード品質**: TypeScript による厳格な型定義
- **コメント**: 複雑な GSAP アニメーション、タイポグラフィ制御にはコメント記述
- **自動フォーマット**: Prettier、ESLint による品質確保

### NFR4: プラットフォーム & CI/CD

- **ホスティング**: Vercel（推奨） / GitHub Pages
- **CI/CD**: GitHub Actions により、`main` ブランチへのプッシュで自動ビルド・デプロイ
- **ランタイム**: Node.js 18.x LTS 以上

---

## 7. 技術スタック詳細（確定）

### 7.1 フロントエンド

| 項目 | 技術 | バージョン | 用途 |
|------|------|-----------|------|
| **Framework** | Next.js | 16.x | App Router, SSG |
| **Language** | TypeScript | 5.x | 型安全なコード |
| **Styling** | Tailwind CSS | 4.x | ユーティリティベース |
| **Animation** | GSAP + ScrollTrigger | 3.12+ | タイムライン、スクロール連動 |
| **Smooth Scroll** | Lenis | 1.x | 慣性スクロール |
| **UI Components** | shadcn/ui | Latest | 基盤パーツ |
| **Icons** | lucide-react | Latest | UI アイコン |
| **Content** | Velite / Markdown | - | ブログ・記事管理 |
| **Font Loading** | `@next/font` | - | Google Fonts 最適化 |

### 7.2 バックエンド（将来対応）

| 項目 | 技術 | バージョン | 用途 |
|------|------|-----------|------|
| **Language** | PHP | 8.x | API ロジック |
| **Framework** | Laravel | 11.x | API フレームワーク |
| **Database** | MySQL / PostgreSQL | 8.x+ | データ永続化 |
| **API Documentation** | Laravel API Resources | - | JSON API 定義 |

### 7.3 DevOps

| 項目 | 技術 | 用途 |
|------|------|------|
| **Package Manager** | npm / pnpm | 依存管理 |
| **Formatter** | Prettier | コード整形 |
| **Linter** | ESLint | コード品質 |
| **CI/CD** | GitHub Actions | 自動デプロイ |
| **Hosting** | Vercel / GitHub Pages | 静的ホスティング |

---

## 8. 制作工程（エンジニアリング重視）

### Phase 1: 基盤構築（現在）
1. **レイアウト・コンポーネント体系**: `Header`, `MenuOverlay`, `FloorContainer`, `ElevatorDoors`, `FloorTransitIndicator`, `NoiseLayer` を実装
2. **Tailwind 統合**: グローバル CSS 変数、Tailwind 設定を完成
3. **GSAP 統合**: エレベーター遷移ロジック、アニメーションタイムラインの基本形を構築

### Phase 2: コンテンツ & 演出
4. **各フロアの実装**: ENTRANCE, OFFICE, LAB, ARCHIVE, RECEPTION の詳細デザイン＆コンテンツ埋め込み
5. **Reveal / Hover Effects**: スクロール・ホバー時のアニメーション調整
6. **Smooth Scroll**: Lenis の統合・チューニング

### Phase 3: 統合・ポーリッシング
7. **モバイル対応**: レスポンシブ確認、タッチ・スワイプ対応（オプション）
8. **パフォーマンス最適化**: 画像遅延ロード、キャッシュ戦略
9. **アクセシビリティ**: キーボード操作、ARIA ラベル、色コントラスト確認

### Phase 4: デプロイ
10. **CI/CD 設定**: GitHub Actions ワークフロー確認
11. **本番環境テスト**: Vercel / GitHub Pages での動作確認
12. **最終ポーリッシング**: パフォーマンス、ビジュアルの最終チューニング

---

## 9. ファイル構成（参考）

```
harry2480/
├── src/
│   ├── app/
│   │   ├── layout.tsx (共通レイアウト)
│   │   ├── page.tsx (Floor 01)
│   │   └── floor/
│   │       ├── [id]/ (動的ルート)
│   │       │   └── page.tsx
│   │       ├── 2/page.tsx (Floor 02)
│   │       ├── 3/page.tsx (Floor 03)
│   │       ├── 4/page.tsx (Floor 04)
│   │       └── 5/page.tsx (Floor 05)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MenuOverlay.tsx
│   │   ├── FloorContainer.tsx
│   │   ├── ElevatorDoors.tsx
│   │   ├── FloorTransitIndicator.tsx
│   │   ├── NoiseLayer.tsx
│   │   ├── AccessCard.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ReceptionForm.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── animations.ts (GSAP タイムライン)
│   │   ├── utils.ts (ユーティリティ)
│   │   └── constants.ts (色、フロア定義)
│   └── styles/
│       └── globals.css (Tailwind, グローバル変数)
├── public/
│   └── images/ (背景画像、プロジェクト画像)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── requirements.md (このファイル)
```

---

## 10. 参考資料

- **BMSG FES '24**: https://bmsgfes.tokyo/2024
- **GSAP Documentation**: https://gsap.com
- **Lenis**: https://lenis.studiofreight.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
