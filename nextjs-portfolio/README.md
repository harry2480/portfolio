# Portfolio Building UI

TypeScript + Next.js で構築された、エレベーター遷移アニメーション付きのポートフォリオサイトです。

## 特徴

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **GSAP** - 高度なアニメーション
- **レスポンシブデザイン** - モバイル対応
- **フロア遷移アニメーション** - エレベーター風UI

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開く

## プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Building.tsx
│   ├── Header.tsx
│   ├── Menu.tsx
│   ├── FloorIndicator.tsx
│   ├── ElevatorDoors.tsx
│   ├── FloorsLayout.tsx
│   ├── Floor.tsx
│   └── floors/
│       ├── Floor01.tsx
│       ├── Floor02.tsx
│       ├── Floor03.tsx
│       ├── Floor04.tsx
│       └── Floor05.tsx
└── hooks/
    └── useFloorNavigation.ts
```

## 使用技術

- **フロントエンド**: React + TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: GSAP + ScrollTrigger
- **フォント**: Bebas Neue, Noto Sans JP

## ブラウザ互換性

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)
