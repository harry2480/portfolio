#!/usr/bin/env python3
"""
ccusage AI - Claude API 使用量確認スキル
自然言語質問に対応したスクリプト
"""

import subprocess
import sys
import re
from datetime import datetime, timedelta

# 為替レート（1 USD = JPY）
USD_TO_JPY = 150.0

class Colors:
    CYAN = '\033[0;36m'
    YELLOW = '\033[1;33m'
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    NC = '\033[0m'

def run_ccusage(args):
    """ccusage コマンドを実行"""
    try:
        cmd = ["npx", "ccusage@latest"] + args
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        return result.stdout if result.returncode == 0 else result.stderr
    except Exception as e:
        return f"エラー: {str(e)}"

def get_date_range(question):
    """質問から日付範囲を抽出"""
    question_lower = question.lower()
    today = datetime.now()

    # 先週日曜～今日
    if any(kw in question_lower for kw in ["先週日曜", "先週の日曜"]):
        days_since_sunday = today.weekday() + 1  # 月=0なので+1
        last_sunday = today - timedelta(days=days_since_sunday + 7)
        return f"--since {last_sunday.strftime('%Y-%m-%d')}"

    # 今週日曜～今日
    if any(kw in question_lower for kw in ["今週日曜", "今週の日曜"]):
        days_since_sunday = today.weekday() + 1
        this_sunday = today - timedelta(days=days_since_sunday)
        return f"--since {this_sunday.strftime('%Y-%m-%d')}"

    # 先週
    if "先週" in question_lower:
        week_ago = today - timedelta(days=7)
        return f"--since {week_ago.strftime('%Y-%m-%d')}"

    # 今週
    if "今週" in question_lower:
        days_since_sunday = today.weekday() + 1
        this_sunday = today - timedelta(days=days_since_sunday)
        return f"--since {this_sunday.strftime('%Y-%m-%d')}"

    # 昨日
    if any(kw in question_lower for kw in ["昨日", "きのう"]):
        yesterday = today - timedelta(days=1)
        return f"--since {yesterday.strftime('%Y-%m-%d')}"

    # 3日前～今日
    if "3日前" in question_lower or "3日間" in question_lower:
        three_days_ago = today - timedelta(days=3)
        return f"--since {three_days_ago.strftime('%Y-%m-%d')}"

    # 1週間
    if "1週間" in question_lower or "1週間前" in question_lower:
        week_ago = today - timedelta(days=7)
        return f"--since {week_ago.strftime('%Y-%m-%d')}"

    return None


def parse_question(question):
    """自然言語質問を解析してコマンドを決定"""
    question_lower = question.lower()

    # 期間指定がある場合
    date_filter = get_date_range(question)
    if date_filter:
        args = ["daily", date_filter]
        return args, f"📅 期間別使用量"

    # 今月の使用量
    if any(kw in question_lower for kw in ["今月", "このかず", "今月度", "月の使用量", "月の支出", "月間"]):
        return ["monthly"], "📊 今月の使用量"

    # 昨月の使用量
    if any(kw in question_lower for kw in ["先月", "前月", "昨月"]):
        return ["monthly"], "📊 先月の使用量"

    # 今日の使用量
    if any(kw in question_lower for kw in ["今日", "本日", "きょう"]):
        return ["daily"], "📅 今日の使用量"

    # 日次レポート
    if any(kw in question_lower for kw in ["日次", "毎日", "日別", "日ごと"]):
        return ["daily"], "📅 日次レポート"

    # セッション別
    if any(kw in question_lower for kw in ["セッション", "会話", "conversation", "session"]):
        return ["sessions"], "💬 セッション別使用量"

    # トータル / 合計
    if any(kw in question_lower for kw in ["合計", "トータル", "全体", "総", "total"]):
        return [], "📈 使用量合計"

    # キャッシュ関連
    if any(kw in question_lower for kw in ["キャッシュ", "cache"]):
        return ["--format", "json"], "💾 キャッシュ情報"

    # JSON出力
    if any(kw in question_lower for kw in ["json", "データ", "詳細"]):
        return ["--format", "json"], "📄 JSON形式でのエクスポート"

    # デフォルト
    return [], "📊 使用量レポート"

def convert_usd_to_jpy(text):
    """出力内の $ 表記を JPY 換算と共に表示"""
    # $XX.XX のパターンを抽出して JPY に変換
    def replace_price(match):
        usd_str = match.group(1)
        try:
            usd_val = float(usd_str)
            jpy_val = usd_val * USD_TO_JPY
            return f"${usd_str} (¥{jpy_val:,.0f})"
        except:
            return match.group(0)

    # $ で始まる数値を変換
    converted = re.sub(r'\$([0-9,]+\.[0-9]{2})', replace_price, text)
    return converted


def format_output(output, title):
    """出力を整形"""
    print(f"\n{Colors.CYAN}━━━━━ {title} ━━━━━{Colors.NC}")

    # USD を JPY に変換して表示
    converted_output = convert_usd_to_jpy(output)
    print(converted_output)

    print(f"{Colors.CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{Colors.NC}\n")

def show_help():
    """ヘルプを表示"""
    help_text = f"""{Colors.CYAN}ccusage AI - Claude API 使用量確認スキル{Colors.NC}

{Colors.YELLOW}使用方法（自然言語質問対応）:{Colors.NC}
  質問: 今月どれくらい使った？
  質問: 昨月の使用量は？
  質問: 今日の支出は？
  質問: セッション別の詳細は？
  質問: 全体の合計は？
  質問: キャッシュの情報は？

{Colors.YELLOW}従来のコマンドライン使用方法:{Colors.NC}
  /ccusage daily              日次レポート
  /ccusage monthly            月次サマリ
  /ccusage sessions           セッション分析
  /ccusage json               JSON エクスポート
  /ccusage help               このヘルプを表示

{Colors.YELLOW}機能:{Colors.NC}
  • 自然言語質問に対応
  • 日次・月次の使用量集計
  • セッション毎のコスト分析
  • キャッシュトークン監視
  • JSON エクスポート機能
  • オフライン動作

{Colors.YELLOW}例:{Colors.NC}
  質問: 今月いくら使った？
  質問: 先月と比べてどう？
  質問: このセッションにいくらかかった？
  質問: キャッシュの削減効果は？
"""
    print(help_text)

def main():
    # 引数チェック
    if len(sys.argv) < 2:
        show_help()
        return

    query = " ".join(sys.argv[1:])

    # ヘルプ表示
    if query.lower() in ["help", "--help", "-h", "ヘルプ"]:
        show_help()
        return

    # 質問を解析
    args, title = parse_question(query)

    # 質問内容を表示
    print(f"\n{Colors.YELLOW}質問:{Colors.NC} {query}")

    # ccusage を実行
    output = run_ccusage(args)

    # 結果を表示
    if output.strip():
        format_output(output, title)
    else:
        print(f"\n{Colors.RED}データが見つかりませんでした。{Colors.NC}")
        print("ccusage のデータが利用可能か確認してください。\n")

if __name__ == "__main__":
    main()
