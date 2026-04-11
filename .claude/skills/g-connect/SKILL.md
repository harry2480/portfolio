---
name: g-connect
description: GWSのCLIツールを使用してGoogle Workspaceの情報取得や操作を行うスキル
---

# g-connect: Google Workspace 連携スキル

このスキルは `gws` CLIツールを使用して、Google Workspace（Gmail, Drive, Calendar, Sheetsなど）の情報取得および操作を行います。

## 利用可能なツール (gws)
ユーザーの依頼に応じて、適切な `gws` コマンドを組み立てて実行してください。

### 1. Gmail 操作
- **最新メールの確認**: `gws gmail +triage`
- **メール検索**: `gws gmail users messages list --params '{"q": "検索クエリ"}'`
- **メール詳細取得**: `gws gmail users messages get --params '{"id": "MESSAGE_ID"}'`
- **メール送信**: `gws gmail +send --to "宛先" --subject "件名" --body "本文"`

### 2. カレンダー操作
- **予定の確認**: `gws calendar +agenda`
- **予定の追加**: `gws calendar +insert --summary "タイトル" --start "2026-01-01T10:00:00Z" --end "2026-01-01T11:00:00Z"`

### 3. ドライブ・ファイル操作
- **ファイル検索**: `gws drive files list --params '{"q": "name contains '\''名前'\''", "pageSize": 10}'`
- **最近のファイル**: `gws drive files list --params '{"orderBy": "modifiedTime desc", "pageSize": 5}'`

## 実行ルール
1. **出力形式**: `gws` は JSON を返します。必要に応じて `jq` を組み合わせて整形するか、JSONの結果を解釈してユーザーに自然な言葉で伝えてください。
2. **安全第一**: 削除や大量の変更を行う前には、必ず `--dry-run` フラグを付けて実行するか、ユーザーに確認を取ってください。
3. **認証エラー**: 認証エラー（Exit Code 2）が発生した場合は、ユーザーに `gws auth login` を実行するように促してください。
4. **タイムゾーン**: 日時を扱う際は、ユーザーの現在時刻（2026年3月）を基準にしてください。

## 例文
- 「最新のメールは？」 → `gws gmail +triage` を実行して結果を要約する。
- 「明日の予定は？」 → `gws calendar +agenda` を実行する。
- 「"予算"という名前のファイルを探して」 → `gws drive files list --params '{"q": "name contains '\''予算'\''"}'` を実行する。
