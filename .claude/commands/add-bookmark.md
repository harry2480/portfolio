---
description: "URL を Documents/WebClips/ にブックマーク保存する"
---

## 引数

$ARGUMENTS

## タスク

指定した URL をブックマークとして `Documents/WebClips/` にローカル保存します。
OGP（タイトル・説明・本文）を自動取得し、Markdown ファイルとして保存します。

### 1. 引数の確認

```bash
# URL が指定されているか確認
# 形式: /add-bookmark <URL> [--source-url=<url>]
```

URL が指定されていない場合、ユーザーに入力を促す。

### 2. スクリプト実行

```bash
node webapp/scripts/add-bookmark.mjs "$URL" [--source-url="$SOURCE_URL"]
```

| 引数 | 説明 |
|------|------|
| `<URL>` | 保存する URL（必須） |
| `--source-url=<url>` | X ポストなど参照元 URL（任意） |

### 3. 出力確認

スクリプトの実行結果から以下を確認する：

- **成功**: `✓ <title>` が表示される
- **失敗**: `❌ Error:` が表示される

### 4. 保存されたファイルを報告

生成されたファイルパスを報告する：

```
✅ ブックマーク保存完了
ファイル: Documents/WebClips/YYYYMMDD-xxxxxxxx-slug.md
タイトル: <title>
プラットフォーム: <platform>
```

### 5. 完了報告

保存完了後、以下を確認することを促す：

- `Documents/WebClips/` にファイルが作成されたか
- Markdown フロントマター（id, title, url, source_platform 等）が正しく生成されたか
