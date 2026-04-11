---
description: "bookmarks.json（Siftly）を documents/WebClips/ に一括インポート"
---

## 引数

$ARGUMENTS

## タスク

Siftly のコンソールスクリプトで出力した `bookmarks.json` を X ブックマークとして一括インポートします。
既に取り込み済みの URL は自動的にスキップされます。

### 1. 引数確認

```bash
# ファイルパスが指定されているか確認
# 形式: /import-x-bookmarks <FILE_PATH> [--dry-run]
```

### 2. スクリプト実行

```bash
node webapp/scripts/import-x-bookmarks.mjs "$FILE_PATH" [--dry-run]
```

| 引数 | 説明 |
|------|------|
| `<FILE_PATH>` | bookmarks.json のパス（必須） |
| `--dry-run` | 実際には保存せず、動作を確認する（任意） |

### 3. 出力確認

スクリプトの実行結果から以下を確認する：

- **成功**: `✓ <author> - <text>` が表示される
- **スキップ**: `⊘ skip - <author>: <text>` で既存ファイルと重複
- **エラー**: `❌ Error:` が表示される

### 4. インポート結果

完了後、以下を確認する：

```
✅ Complete
  Imported: 12
  Skipped:  30 (already exists)
```

### 5. 検索インデックス更新（オプション）

新しいブックマークを検索対象に追加したい場合：

```bash
node webapp/scripts/build-search-index.mjs
```

---

## dry-run での確認

まずドライラン（実際には保存しない）で内容を確認することを推奨：

```bash
/import-x-bookmarks ~/Downloads/bookmarks.json --dry-run
```
