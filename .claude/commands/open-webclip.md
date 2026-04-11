---
description: "WebClips から URL を抽出してブラウザで開く（単一/複数/フォルダ対応）"
---

## 引数

$ARGUMENTS

## タスク

指定した WebClips の Markdown ファイルまたはフォルダから URL を抽出してブラウザで開きます。

### 対応モード

1. **単一/複数ファイル**: `url:` フロントマターから URL を抽出
2. **フォルダ指定**: フォルダ内の全 MD から URL を抽出（フォルダ名でドメイン絞り込み）

### 1. 引数の解析と正規化

```bash
# 引数がない場合はエラー
if [ -z "$ARGUMENTS" ]; then
  echo "❌ 引数が必要です"
  echo "用法: open-webclip <ファイル|フォルダ> [ファイル2] [ファイル3]..."
  exit 1
fi

# 複数引数を処理
ARGS=($ARGUMENTS)
IS_FOLDER=false
IS_SINGLE_FILE=false

# 最初の引数でモード判定
FIRST_ARG="${ARGS[0]}"

# ベースパスの解決
if [[ ! "$FIRST_ARG" =~ ^/ ]] && [[ ! "$FIRST_ARG" =~ ^documents/ ]]; then
  # 相対パス → documents/WebClips/ 基準にしない（ユーザーの明示的パスを優先）
  RESOLVED_PATH="documents/WebClips/$FIRST_ARG"
else
  RESOLVED_PATH="$FIRST_ARG"
fi

# ディレクトリ判定
if [ -d "$RESOLVED_PATH" ]; then
  IS_FOLDER=true
elif [ -f "$RESOLVED_PATH" ] && [ ${#ARGS[@]} -eq 1 ]; then
  IS_SINGLE_FILE=true
elif [ ${#ARGS[@]} -gt 1 ]; then
  # 複数ファイルモード
  :
else
  echo "❌ ファイルまたはフォルダが見つかりません: $FIRST_ARG"
  exit 1
fi
```

### 2a. 単一/複数ファイルモード

```bash
if [ "$IS_SINGLE_FILE" = true ] || [ ${#ARGS[@]} -gt 1 ]; then
  URLS=()

  for ARG in "${ARGS[@]}"; do
    # ベースパス解決
    if [[ ! "$ARG" =~ ^/ ]] && [[ ! "$ARG" =~ ^documents/ ]]; then
      FILE="documents/WebClips/$ARG"
    else
      FILE="$ARG"
    fi

    if [ ! -f "$FILE" ]; then
      echo "⚠️  ファイルが見つかりません: $ARG"
      continue
    fi

    # URL 抽出（フロントマター）
    URL=$(grep -m1 '^url:' "$FILE" | sed 's/^url: *"\(.*\)"/\1/')

    # フロントマターなしの場合は Source: パターンを試す
    if [ -z "$URL" ]; then
      URL=$(grep -m1 '> Source:' "$FILE" | awk -F'[()]' '{print $(NF-1)}')
    fi

    if [ -n "$URL" ]; then
      URLS+=("$URL")
    else
      echo "⚠️  URL が見つかりません: $FILE"
    fi
  done

  if [ ${#URLS[@]} -eq 0 ]; then
    echo "❌ 抽出可能な URL がありません"
    exit 1
  fi

  # URL を開く
  for URL in "${URLS[@]}"; do
    open "$URL"
  done

  echo "✅ ${#URLS[@]} 件の URL を開きました"
  for URL in "${URLS[@]}"; do
    echo "  - $URL"
  done
fi
```

### 2b. フォルダモード

```bash
if [ "$IS_FOLDER" = true ]; then
  FOLDER="$RESOLVED_PATH"

  # フォルダ名からターゲットドメインを決定
  FOLDER_NAME=$(basename "$FOLDER" | tr '[:upper:]' '[:lower:]')
  TARGET_DOMAIN=""

  case "$FOLDER_NAME" in
    x) TARGET_DOMAIN="x.com" ;;
    zenn) TARGET_DOMAIN="zenn.dev" ;;
    note) TARGET_DOMAIN="note.com" ;;
    qiita) TARGET_DOMAIN="qiita.com" ;;
    web) TARGET_DOMAIN="" ;; # 絞り込みなし
    *) TARGET_DOMAIN="" ;;
  esac

  # フォルダ内の .md ファイルを検索
  MD_FILES=($(find "$FOLDER" -maxdepth 1 -type f -name "*.md" | sort))
  FILE_COUNT=${#MD_FILES[@]}

  if [ "$FILE_COUNT" -eq 0 ]; then
    echo "❌ Markdown ファイルが見つかりません: $FOLDER"
    exit 1
  fi


  # URL を抽出・開く
  URLS=()
  for FILE in "${MD_FILES[@]}"; do
    # URL 抽出
    URL=$(grep -m1 '^url:' "$FILE" | sed 's/^url: *"\(.*\)"/\1/')

    if [ -z "$URL" ]; then
      URL=$(grep -m1 '> Source:' "$FILE" | awk -F'[()]' '{print $(NF-1)}')
    fi

    if [ -z "$URL" ]; then
      continue
    fi

    # ドメイン絞り込み
    if [ -n "$TARGET_DOMAIN" ]; then
      if [[ "$URL" =~ $TARGET_DOMAIN ]]; then
        URLS+=("$URL")
      fi
    else
      URLS+=("$URL")
    fi
  done

  if [ ${#URLS[@]} -eq 0 ]; then
    echo "❌ 抽出可能な URL がありません"
    [ -n "$TARGET_DOMAIN" ] && echo "（フィルター: $TARGET_DOMAIN）"
    exit 1
  fi

  # URL を開く
  for URL in "${URLS[@]}"; do
    open "$URL"
  done

  echo "✅ $FILE_COUNT 件中 ${#URLS[@]} 件の URL を開きました"
  [ -n "$TARGET_DOMAIN" ] && echo "（フィルター: $TARGET_DOMAIN）"
fi
```

### 3. エラーハンドリング

URL が見つからない場合はファイル名とエラーメッセージを表示します。

### 4. 結果報告

- 成功: `✅ N 件の URL を開きました` + URL リスト
- エラー: `❌ メッセージ`
