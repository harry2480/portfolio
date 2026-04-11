# acquire-ledger-data

`harry2480/ledger` リポジトリの `data/private-transaction.csv` から購入データを取得し、指定したクエリにマッチする購入履歴を日本語の自然文で返す。

## 実行手順

### 1. 引数の確認

ユーザーが指定した検索語（クエリ）を確認する。引数がない場合はユーザーに検索語を尋ねる。

### 2. CSVの取得

以下の順でCSVを取得する：

```bash
# まず gh API を試す
gh api repos/harry2480/ledger/contents/data/private-transaction.csv --jq .content | base64 --decode > /tmp/ledger_transactions.csv 2>/dev/null

# 失敗した場合は raw URLにフォールバック
curl -sS "https://raw.githubusercontent.com/harry2480/ledger/feat/add-purchase-url/data/private-transaction.csv" -o /tmp/ledger_transactions.csv
```

### 3. データ抽出と出力

取得したCSVから引数のクエリに部分一致（大文字小文字区別なし）する行を抽出し、以下の形式で出力する：

```
yyyy年mm月dd日に <商品名> を購入しました — ¥xx,xxx — <URL>
```

- マッチがない場合: `No matching purchase found.` を出力
- 日付列: `date`, `購入日`, `日付`, `purchase_date` のいずれか
- 金額列: `amount`, `price`, `金額`, `cost`, `cost_yen` のいずれか
- 商品名列: `description`, `item`, `memo`, `title`, `detail` のいずれか
- URL列: `url`, `link`, `purchase_url` のいずれか

実行後は `/tmp/ledger_transactions.csv` を削除する。

### 4. 完了報告

マッチした件数と結果を返す。
