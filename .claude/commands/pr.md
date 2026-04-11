---
description: "現在のブランチからdevelopに対してPRを作成する（全体）"
---

## 引数

$ARGUMENTS

## タスク

現在のブランチの変更からdevelopブランチに対してPRを日本語で作成します。

### 1. 事前確認

```bash
# 最新のdevelopをfetch
git fetch origin develop

# 現在のブランチ名と状態を確認
git branch --show-current
git status

# 未コミットの変更と差分コミットを確認
git diff HEAD --stat
```

未コミットの変更が0件の場合はPR作成を中止する。

### 2. 新規ブランチを作成

**必ず develop から新規ブランチを切ってからPRを作成する**（既存ブランチの使い回し禁止）。
例外: Vercelのデプロイエラーが発生しており、同一PRに修正を追加する場合のみ既存ブランチを使用してよい。

```bash
git checkout -b <ブランチ名> origin/develop
```

ブランチ名の命名規則: `feat/`, `fix/`, `chore/` + 変更内容を表す短い名前（英語・kebab-case）

### 3. 未コミットの変更をコミット

`git status` で未コミットの変更がある場合は、内容を確認したうえでコミットする：

```bash
git add <対象ファイル>
git commit -m "<コミットメッセージ>"
```

意図しないファイルが含まれていないか必ず確認する。

### 3.5. develop の最新をマージして search-index を再ビルド

PR 作成前に **必ず実行する**（search-index.json のコンフリクト防止）：

```bash
git fetch origin develop
git merge origin/develop --no-edit

# search-index を最新状態に再ビルド
cd webapp && node scripts/build-search-index.mjs && cd ..
git add webapp/public/search-index.json webapp/public/search-index-manifest.json webapp/public/folder-titles.json

# 変更があればコミット
git diff --cached --quiet || git commit -m "build: PR 作成前に search-index を最新化"
```

### 4. リモートにpush

```bash
git push -u origin $(git branch --show-current)
```

### 4. PRタイトルと本文の生成

`.github/PULL_REQUEST_TEMPLATE.md` を読み込み、テンプレートに従ってPR本文を生成する。

- **タイトル**: コミットが1つならそのメッセージ、複数なら変更内容を要約（70文字以内・日本語）
- **本文**: PRテンプレートの形式に従い、各セクションを日本語で埋める
  - `# 変更の概要`: 変更内容を箇条書きで記載
  - `# 変更の背景`: 変更理由と関連Issue（あれば `closes #<issue番号>`）
  - `# スクリーンショット`: フロントエンドの変更がない場合はチェックを入れる

### 5. gh pr create の実行

```bash
gh pr create --base develop --title "<日本語タイトル>" --body "$(cat <<'EOF'
<テンプレートに従った日本語本文>
EOF
)"
```

### 6. PR差分の検証

```bash
gh pr diff <PR番号> --name-only
```

意図した変更のみが含まれているか確認する。

### 7. 完了報告

```
✅ PR作成完了
PR URL: <PR URL>
```
