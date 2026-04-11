# pdf-ocr - PDF から Markdown への変換スキル

PDF を Markdown に変換するスキルです。デジタル PDF（テキスト層あり）とスキャン済み PDF（OCR 必要）の両方に対応しています。

## 機能

- **デジタル PDF**: ローカルモード（軽量、高速、0.05秒/ページ）
- **スキャン済み PDF**: ハイブリッドモード（OCR、CPU 動作、初回のみモデルダウンロード）
- **外部 API なし**: 完全ローカル処理
- **多言語対応**: 80 言語以上（日本語・中国語・韓国語など）

## 使用方法

```
/pdf-ocr <PDFファイルパス>
```

実行時に以下を聞かれます：

**「このPDFはデジタルPDFですか、スキャン済みPDFですか？」**

- デジタル PDF: 軽量・高速処理
- スキャン済み PDF: OCR が起動（初回のみ SmolVLM 256M をダウンロード）

## 出力

- Markdown が stdout に表示される
- 入力ファイルと同じディレクトリに `<basename>.md` として保存される

## 前提条件

**Java 11+** が必須です。

```bash
# インストール確認
java -version

# インストールされていない場合
brew install openjdk@17
```

**Python パッケージ**（初回のみ）

```bash
# デジタル PDF 用（推奨）
pip install -U opendataloader-pdf

# スキャン済み PDF にも対応する場合
pip install -U "opendataloader-pdf[hybrid]"
```

## 処理速度

| タイプ | 速度 | 負荷 |
|-------|------|------|
| デジタル PDF | 0.05 秒/ページ | 最小（Java のみ） |
| スキャン済み PDF | 0.43 秒/ページ | 低〜中（CPU 使用、GPU 不要） |

## 例

```bash
# デジタル PDF
/pdf-ocr ~/Documents/report.pdf
# → デジタル選択 → ~/Documents/report.md に変換

# スキャン済み PDF
/pdf-ocr ~/Documents/scanned.pdf
# → スキャン済み選択 → OCR 処理 → ~/Documents/scanned.md に変換
```

## トラブルシューティング

### Java が見つからない

```bash
java -version
# command not found の場合
brew install openjdk@17
```

### opendataloader-pdf が見つからない

```bash
pip install -U opendataloader-pdf
# または
pip install -U "opendataloader-pdf[hybrid]"
```

### スキャン済み PDF で遅い

初回実行時に SmolVLM（256M）をダウンロードしています。
2 回目以降は高速化します。

### OCR 精度が低い

最低解像度 300 DPI が推奨されています。
より高い DPI でスキャンすると精度が向上します。
