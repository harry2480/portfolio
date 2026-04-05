---
title: "Next.js 15 での Server Components とキャッシング戦略"
date: "2024-12-15"
excerpt: "Next.js 15 の Server Components とキャッシング戦略の実務的ガイド。"
tags:
  - Next.js
  - React
  - Performance
published: true
---

Next.js 15 では、Server Components がまるごと再設計されました。これにより、クライアント側のバンドルサイズを大幅に削減しながら、サーバー側で複雑なロジックを処理できるようになりました。

本記事では、Server Components の基本概念から、実際のキャッシング戦略、データフェッチングのベストプラクティスまでを網羅的に解説します。

## Server Components の基本

Server Components は、サーバー上でのみ実行され、HTML として送信される React コンポーネントです。これにより以下のメリットが得られます：

- クライアント JavaScript バンドルの削減
- 機密情報の安全な処理
- データベースへの直接アクセス

## キャッシング戦略の実装

Next.js 15 では、複数のレベルでキャッシングが可能になりました：

1. **request キャッシング**: リクエスト内でのデータ重複排除
2. **Data Cache**: ビルド時またはオンデマンドでのデータキャッシング
3. **Full Route Cache**: 完全にレンダリングされたルートのキャッシュ

これらを適切に組み合わせることで、パフォーマンスと鮮度のバランスを取ることができます。

## 実装例

```typescript
async function getUser(id: string) {
  const user = await fetch(`https://api.example.com/users/${id}`, {
    next: { revalidate: 3600 } // 1時間キャッシュ
  })
  return user.json()
}
```

この方法により、サーバーとクライアントの責任を明確に分離しながら、最高のパフォーマンスを実現できます。
