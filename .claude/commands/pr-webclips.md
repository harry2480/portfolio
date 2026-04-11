---
description: "documents/WebClips フォルダの変更に絞ってdevelopに対してPRを作成する"
---

## 引数

$ARGUMENTS

## タスク

`documents/WebClips/` フォルダ配下の変更のみを対象に、developブランチに対してPRを日本語で作成します。

### 1. 事前確認

```bash
# 最新のdevelopをfetch
git fetch origin develop

# 現在のブランチ名を確認
git branch --show-current

# documents/WebClips/配下の変更ファイルを確認
git diff HEAD --stat -- documents/WebClips/
git status -- documents/WebClips/
```

未コミットの変更が0件の場合はPR作成を中止する。

### 2. 新規ブランチを作成

**必ず develop から新規ブランチを切ってからPRを作成する**（既存ブランチの使い回し禁止）。
例外: デプロイエラーが発生しており、同一PRに修正を追加する場合のみ既存ブランチを使用してよい。

変更内容を表すブランチ名を命名し、developから切る：

```bash
git checkout -b <ブランチ名> origin/develop
```

ブランチ名の命名規則: `bookmark/` + 変更内容を表す短い名前（英語・kebab-case）
例: `bookmark/add-zenn-articles`, `bookmark/update-security-topics`

### 3. 未コミットの変更をコミット

`documents/WebClips/` 配下に未コミットの変更がある場合はコミットする：

```bash
git add documents/WebClips/
git commit -m "<コミットメッセージ>"
```

### 4. リモートにpush

```bash
git push -u origin $(git branch --show-current)
```

### 5. PRタイトルと本文の生成

`.github/PULL_REQUEST_TEMPLATE.md` を読み込み、**documents/WebClips/配下の変更のみ**を対象にPR本文を生成する。

- **タイトル**: WebClips変更内容を要約（70文字以内・日本語）、`bookmark:` プレフィックスを付ける
  例: `bookmark: Zenn セキュリティ記事 3件追加`
- **本文**: PRテンプレートの形式に従い、各セクションを日本語で埋める
  - `# 変更の概要`: WebClips内の追加・更新されたブックマーク数・カテゴリを箇条書きで記載
  - `# 変更の背景`: ブックマーク追加の理由や参考リンク（あれば `closes #<issue番号>`）
  - `# スクリーンショット`: 不要（ドキュメント追加なので）

### 6. gh pr create の実行

```bash
gh pr create --base develop --title "<日本語タイトル>" --body "$(cat <<'EOF'
<テンプレートに従った日本語本文>
EOF
)"
```

### 7. PR差分の検証

```bash
gh pr diff <PR番号> --name-only
```

`documents/WebClips/` 以外のファイルが含まれていないか確認する。含まれている場合はその旨をユーザーに伝える。

### 8. 完了報告

```
✅ PR作成完了（WebClips）
PR URL: <PR URL>
```
