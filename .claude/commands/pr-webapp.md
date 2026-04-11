---
description: "webappフォルダの変更に絞ってdevelopに対してPRを作成する"
---

## 引数

$ARGUMENTS

## タスク

`webapp/` フォルダ配下の変更のみを対象に、developブランチに対してPRを日本語で作成します。

### 1. 事前確認

```bash
# 最新のdevelopをfetch
git fetch origin develop

# 現在のブランチ名を確認
git branch --show-current

# webapp/配下の変更ファイルを確認
git diff HEAD --stat -- webapp/
git status -- webapp/
```

未コミットの変更が0件の場合はPR作成を中止する。

### 2. 新規ブランチを作成

**必ず develop から新規ブランチを切ってからPRを作成する**（既存ブランチの使い回し禁止）。
例外: Vercelのデプロイエラーが発生しており、同一PRに修正を追加する場合のみ既存ブランチを使用してよい。

変更内容を表すブランチ名を命名し、developから切る：

```bash
git checkout -b <ブランチ名> origin/develop
```

ブランチ名の命名規則: `feat/`, `fix/`, `chore/` + 変更内容を表す短い名前（英語・kebab-case）

### 3. 未コミットの変更をコミット

`webapp/` 配下に未コミットの変更がある場合はコミットする：

```bash
git add webapp/<対象ファイル>
git commit -m "<コミットメッセージ>"
```

### 4. リモートにpush

```bash
git push -u origin $(git branch --show-current)
```

### 5. PRタイトルと本文の生成

`.github/PULL_REQUEST_TEMPLATE.md` を読み込み、**webapp/配下の変更のみ**を対象にPR本文を生成する。

- **タイトル**: webapp変更内容を要約（70文字以内・日本語）、`feat(webapp):` / `fix(webapp):` 等のプレフィックスを付ける
- **本文**: PRテンプレートの形式に従い、各セクションを日本語で埋める
  - `# 変更の概要`: webapp内の変更内容を箇条書きで記載
  - `# 変更の背景`: 変更理由と関連Issue（あれば `closes #<issue番号>`）
  - `# スクリーンショット`: フロントエンドの変更があるためスクリーンショットを添付するよう促す

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

`webapp/` 以外のファイルが含まれていないか確認する。含まれている場合はその旨をユーザーに伝える。

### 8. 完了報告

```
✅ PR作成完了（webapp）
PR URL: <PR URL>
```
