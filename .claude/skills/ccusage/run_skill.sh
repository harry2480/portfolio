#!/bin/bash
#
# ccusage - Claude API 使用量確認スキル
# 自然言語質問対応版
# 実行方法: /ccusage 今月どれくらい使った？
#

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Python スクリプトを実行
python3 "$SCRIPT_DIR/ccusage_ai.py" "$@"
