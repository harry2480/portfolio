---
title: "Web パフォーマンス最適化 — Core Web Vitals への取り組み"
date: "2024-09-22"
excerpt: "Core Web Vitals（LCP/FID/CLS）の改善手法と測定方法。"
tags:
  - Performance
  - Web Vitals
  - Optimization
published: true
---

Google が推奨する Core Web Vitals は、ユーザー体験の核となる指標です。本記事では、これらの指標の改善方法を実装レベルで解説します。

## Core Web Vitals の3つの指標

### 1. Largest Contentful Paint (LCP)
ページの主なコンテンツが読み込まれるまでの時間。目標は 2.5 秒以下。

対策：
- 画像最適化（WebP、適切なサイズ指定）
- リソースの優先度付け
- サーバーレスポンスタイムの改善

### 2. First Input Delay (FID)
ユーザーの最初のインタラクションに対するレスポンスタイム。目標は 100 ミリ秒以下。

対策：
- JavaScript の長い実行時間を分割
- Web Workers の活用
- 不要なライブラリの削除

### 3. Cumulative Layout Shift (CLS)
ページのレイアウトがどれだけ変動するかを示す指標。目標は 0.1 未満。

対策：
- 画像・動画に明示的なサイズを指定
- フォントを読み込む際の空間予約
- 広告・埋め込みコンテンツのサイズ確保

## 測定とモニタリング

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getLCP(console.log)
```

これらを定期的にモニタリングすることで、継続的な改善ができます。
