#!/bin/bash
#
# pdf-ocr - PDF から Markdown への変換スクリプト
# 使用方法: run.sh <ファイルパス> <タイプ>
#   タイプ: digital | scan
#

set -e

FILE_PATH="$1"
TYPE="$2"

if [ -z "$FILE_PATH" ]; then
  echo "❌ Error: ファイルパスが指定されていません"
  echo "使用方法: run.sh <ファイルパス> <digital|scan>"
  exit 1
fi

if [ ! -f "$FILE_PATH" ]; then
  echo "❌ Error: ファイルが見つかりません: $FILE_PATH"
  exit 1
fi

if [ -z "$TYPE" ]; then
  echo "❌ Error: タイプが指定されていません（digital|scan）"
  exit 1
fi

# ファイル名・拡張子を抽出
BASENAME=$(basename "$FILE_PATH" .pdf)
DIR=$(dirname "$FILE_PATH")
OUTPUT_FILE="$DIR/$BASENAME.md"

echo "📄 Processing: $FILE_PATH"
echo "Type: $TYPE"
echo "Output: $OUTPUT_FILE"
echo ""

if [ "$TYPE" = "digital" ]; then
  # ローカルモード（デジタルPDF用）
  echo "⚙️  Running opendataloader-pdf (ローカルモード)..."
  opendataloader-pdf "$FILE_PATH" -o markdown -O "$OUTPUT_FILE"

elif [ "$TYPE" = "scan" ]; then
  # ハイブリッドモード（スキャン済みPDF用）
  echo "⚙️  Starting hybrid backend..."

  # ハイブリッドバックエンドを起動（バックグラウンド）
  opendataloader-pdf-hybrid --port 5002 --force-ocr > /tmp/pdf-ocr-backend.log 2>&1 &
  BACKEND_PID=$!

  # バックエンド起動待機
  sleep 5

  # ハイブリッドモードで処理
  echo "⚙️  Running opendataloader-pdf (ハイブリッドモード + OCR)..."
  opendataloader-pdf --hybrid docling-fast "$FILE_PATH" --force-ocr -o markdown -O "$OUTPUT_FILE" || {
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
  }

  # バックエンドを終了
  echo "⚙️  Stopping backend..."
  kill $BACKEND_PID 2>/dev/null || true
  sleep 1
else
  echo "❌ Error: 不正なタイプです。digital または scan を指定してください"
  exit 1
fi

# 処理結果を確認
if [ -f "$OUTPUT_FILE" ]; then
  LINE_COUNT=$(wc -l < "$OUTPUT_FILE")
  echo ""
  echo "✅ 完了"
  echo "ファイル: $OUTPUT_FILE"
  echo "行数: $LINE_COUNT"
else
  echo "❌ Error: 出力ファイルが生成されませんでした"
  exit 1
fi
