#!/usr/bin/env python3
"""
トレンド情報収集スクリプト
はてなブックマーク、Hacker News、Reddit、Qiita、Zennからトレンド情報を収集

【重要】各ソース取得方法：
- はてブ: RSSフィード (https://b.hatena.ne.jp/hotentry/it.rss) - RDF/RSS 1.0 形式
- Zenn: JSON API優先 (https://zenn.dev/api/articles), フォールバック: Atom フィード
- Qiita: JSON API (https://qiita.com/api/v2/items)
- HN: Firebase API (https://hacker-news.firebaseio.com/v0/)
- Reddit: REST API (https://old.reddit.com/r/{subreddit}/hot.json)
- 追加: RSS/Atom フィード各種
"""

import requests
import json
import re
import sys
from datetime import datetime
from html.parser import HTMLParser
from typing import List, Dict, Tuple
import xml.etree.ElementTree as ET

# 日付設定
TODAY = datetime.now().strftime("%Y%m%d")
DATE_STR = datetime.now().strftime("%Y-%m-%d")
OUTPUT_FILE = f"ideas/daily/{TODAY}-trend.md"

# トピック判定用キーワード
TOPIC_KEYWORDS = {
    "機械学習 / AI": ["AI", "LLM", "Transformer", "model", "neural", "深層学習", "生成AI", "プロンプト", "ファインチューニング", "Claude", "ChatGPT", "GPT"],
    "セキュリティ / プライバシー": ["security", "脆弱性", "セキュリティ", "攻撃", "暗号", "privacy", "exploit", "CVE", "hack"],
    "OSS / コミュニティ": ["open source", "OSS", "GitHub", "ライセンス", "コミュニティ", "オープンソース"],
    "組織 / プロダクト / ビジネス": ["SaaS", "startups", "startup", "投資", "スタートアップ", "プロダクト", "収益", "ビジネス"],
    "開発": ["development", "開発", "コード", "プログラミング", "エンジニア", "フレームワーク", "ライブラリ"],
}

def get_interest_level(title: str, content: str = "") -> str:
    """興味度を判定"""
    text = (title + " " + content).lower()

    # 高関連度キーワード
    high_keywords = ["ai", "security", "セキュリティ", "llm", "open source", "oss", "claude", "agent", "api"]
    if any(kw in text for kw in high_keywords):
        return "★★★"

    # 中関連度キーワード
    mid_keywords = ["development", "開発", "プログラミング", "tools", "framework", "data", "web"]
    if any(kw in text for kw in mid_keywords):
        return "★★"

    return "★"

def get_topic(title: str, content: str = "") -> str:
    """トピックを判定"""
    text = (title + " " + content).lower()

    for topic, keywords in TOPIC_KEYWORDS.items():
        if any(kw.lower() in text for kw in keywords):
            return topic
    return "開発"

def fetch_hatena_bookmarks() -> List[Dict]:
    """はてなブックマークIT人気エントリーを取得（RSSフィード使用）"""
    entries = []

    try:
        # はてぶ RSS フィード（RDF/RSS 1.0形式）
        resp = requests.get(
            "https://b.hatena.ne.jp/hotentry/it.rss",
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=5
        )

        if resp.status_code == 200:
            root = ET.fromstring(resp.content)

            # RDF/RSS 1.0 ネームスペース定義
            ns = {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'rss': 'http://purl.org/rss/1.0/',
                'dc': 'http://purl.org/dc/elements/1.1/',
                'hatena': 'http://www.hatena.ne.jp/info/xmlns#'
            }

            # RSS 1.0形式: item要素を全文から探す（ネームスペース付き）
            for item in root.findall('rss:item', ns):
                title_elem = item.find('rss:title', ns)
                link_elem = item.find('rss:link', ns)

                if title_elem is not None and link_elem is not None:
                    title = (title_elem.text or "").strip()
                    url = (link_elem.text or "").strip()

                    if title and url and url.startswith('http'):
                        topic = get_topic(title)
                        interest = get_interest_level(title)
                        entries.append({
                            "title": title,
                            "url": url,
                            "count": "—",
                            "source": "はてブ",
                            "topic": topic,
                            "interest": interest,
                        })

                        if len(entries) >= 20:
                            break
    except Exception as e:
        print(f"はてぶ RSS 取得失敗: {e}", file=sys.stderr)

    return entries

def fetch_hacker_news() -> List[Dict]:
    """Hacker Newsを取得"""
    entries = []

    try:
        # Firebase APIから上位記事を取得
        resp = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json", timeout=5)
        story_ids = resp.json()[:30]

        for story_id in story_ids[:15]:
            try:
                item_resp = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json", timeout=3)
                item = item_resp.json()

                if item and "title" in item:
                    title = item["title"]
                    score = item.get("score", 0)
                    comments = item.get("descendants", 0)

                    # 日本語翻訳
                    ja_title = translate_title_to_japanese(title)

                    topic = get_topic(ja_title, title)
                    interest = get_interest_level(ja_title, title)

                    entries.append({
                        "title": ja_title,
                        "url": f"https://news.ycombinator.com/item?id={story_id}",
                        "count": f"{score} pts",
                        "source": "HN",
                        "topic": topic,
                        "interest": interest,
                    })
            except Exception as e:
                continue
    except Exception as e:
        print(f"HN fetch error: {e}", file=sys.stderr)

    return entries

def fetch_reddit() -> List[Dict]:
    """Redditを取得"""
    entries = []

    subreddits = [
        "programming", "technology", "netsec", "cybersecurity",
        "OpenAI", "ChatGPT", "LocalLLaMA", "ClaudeCode",
        "ArtificialIntelligence", "PromptEngineering",
        "opensource", "indiehackers", "webdev", "javascript", "typescript"
    ]

    for subreddit in subreddits:
        try:
            url = f"https://old.reddit.com/r/{subreddit}/hot.json?t=day&limit=10"
            resp = requests.get(
                url,
                headers={"User-Agent": "neta-trend-collector/1.0 (trend analysis tool)"},
                timeout=5
            )

            if resp.status_code != 200:
                continue

            data = resp.json()
            for item in data.get("data", {}).get("children", [])[:3]:
                post = item.get("data", {})
                title = post.get("title", "")
                if not title:
                    continue

                # 日本語翻訳
                ja_title = translate_title_to_japanese(title)

                ups = post.get("ups", 0)
                comments = post.get("num_comments", 0)
                permalink = post.get("permalink", "")

                topic = get_topic(ja_title, title)
                interest = get_interest_level(ja_title, title)

                entries.append({
                    "title": ja_title,
                    "url": f"https://www.reddit.com{permalink}",
                    "ups": ups,
                    "comments": comments,
                    "subreddit": subreddit,
                    "source": "Reddit",
                    "topic": topic,
                    "interest": interest,
                })
        except Exception as e:
            continue

    return entries

def fetch_qiita() -> List[Dict]:
    """Qiitaを取得"""
    entries = []

    try:
        resp = requests.get(
            "https://qiita.com/api/v2/items?page=1&per_page=20",
            headers={
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0"
            },
            timeout=5
        )

        if resp.status_code == 200:
            items = resp.json()
            for item in items[:10]:
                title = item.get("title", "")
                url = item.get("url", "")

                if not title or not url:
                    continue

                # likes_count を取得
                likes = item.get("likes_count", 0)

                topic = get_topic(title)
                interest = get_interest_level(title)

                entries.append({
                    "title": title,
                    "url": url,
                    "count": f"{likes} likes" if likes > 0 else "（新着）",
                    "source": "Qiita",
                    "topic": topic,
                    "interest": interest,
                })
    except Exception as e:
        print(f"Qiita fetch error: {e}", file=sys.stderr)

    return entries

def fetch_zenn() -> List[Dict]:
    """Zennを取得（JSON API優先、フォールバック: Atomフィード）"""
    entries = []

    # 方法1: JSON API を優先
    try:
        resp = requests.get(
            "https://zenn.dev/api/articles?limit=20&order=latest",
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=5
        )

        if resp.status_code == 200 and 'articles' in resp.text:
            data = resp.json()
            articles = data.get('articles', [])

            for article in articles[:15]:
                title = article.get('title', '').strip()
                path = article.get('path', '')

                if title and path:
                    url = f"https://zenn.dev{path}"
                    topic = get_topic(title)
                    interest = get_interest_level(title)

                    entries.append({
                        "title": title,
                        "url": url,
                        "source": "Zenn",
                        "topic": topic,
                        "interest": interest,
                    })

            if entries:
                return entries
    except Exception as e:
        print(f"Zenn JSON API 取得失敗: {e}", file=sys.stderr)

    # 方法2: フォールバック - Atomフィード
    try:
        resp = requests.get(
            "https://zenn.dev/feed.atom",
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=5
        )

        if resp.status_code == 200:
            root = ET.fromstring(resp.content)

            # Atom フィード（namespace対応）
            ns = {'atom': 'http://www.w3.org/2005/Atom'}
            for entry in root.findall('atom:entry', ns)[:15]:
                title_elem = entry.find('atom:title', ns)
                link_elem = entry.find('atom:link', ns)

                if title_elem is not None and link_elem is not None:
                    title = (title_elem.text or "").strip()
                    url = link_elem.get('href', '').strip()

                    if title and url:
                        topic = get_topic(title)
                        interest = get_interest_level(title)

                        entries.append({
                            "title": title,
                            "url": url,
                            "source": "Zenn",
                            "topic": topic,
                            "interest": interest,
                        })
    except Exception as e:
        print(f"Zenn Atom フィード 取得失敗: {e}", file=sys.stderr)

    return entries

def fetch_additional_sources() -> List[Dict]:
    """追加ソースを取得（WIRED、Gigazine、gori.me、ITmedia、Watch Impress、Aikido、Wiz）"""
    entries = []

    sources = [
        ("WIRED.jp", "https://wired.jp/feed/"),
        ("Gigazine", "https://gigazine.net/news/rss_2.0/"),
        ("gori.me", "https://gori.me/feed"),
        ("ITmedia AI+", "https://www.itmedia.co.jp/aiplus/rss/index.html"),
        ("Watch Impress", "https://watch.impress.co.jp/data/rss/feeds.rss"),
        ("Aikido", "https://www.aikido.dev/blog/rss.xml"),
        ("Wiz", "https://www.wiz.io/blog/feed"),
    ]

    for source_name, feed_url in sources:
        try:
            resp = requests.get(
                feed_url,
                headers={"User-Agent": "Mozilla/5.0"},
                timeout=5
            )
            if resp.status_code != 200:
                continue

            root = ET.fromstring(resp.content)

            # ネームスペース対応
            namespaces = {
                'content': 'http://purl.org/rss/1.0/modules/content/',
                'atom': 'http://www.w3.org/2005/Atom',
            }

            # RSS 2.0形式のitem（ネームスペースなし）
            items = root.findall('.//item')
            for item in items[:3]:
                title_elem = item.find('title')
                link_elem = item.find('link')

                if title_elem is not None and link_elem is not None:
                    title = (title_elem.text or "").strip()
                    url = (link_elem.text or "").strip()

                    if title and url:
                        topic = get_topic(title)
                        interest = get_interest_level(title)

                        entries.append({
                            "title": title,
                            "url": url,
                            "source": source_name,
                            "topic": topic,
                            "interest": interest,
                        })
        except Exception as e:
            print(f"{source_name} 取得失敗: {e}", file=sys.stderr)
            continue

    return entries


def translate_title_to_japanese(title: str) -> str:
    """タイトルを日本語に翻訳"""

    # 主要なキーワード辞書（英語 -> 日本語）
    translations = {
        # 企業・プロダクト
        "Show HN": "HNに投稿",
        "Ask HN": "HNで質問",
        "Launch HN": "HNでローンチ",

        # テクノロジー
        "AI": "AI",
        "ML": "機械学習",
        "LLM": "LLM",
        "API": "API",
        "CLI": "CLI",
        "SDK": "SDK",
        "GitHub": "GitHub",
        "Docker": "Docker",
        "Kubernetes": "Kubernetes",

        # プログラミング言語
        "Python": "Python",
        "JavaScript": "JavaScript",
        "TypeScript": "TypeScript",
        "Rust": "Rust",
        "Go": "Go",
        "Java": "Java",
        "C++": "C++",

        # セキュリティ
        "Security": "セキュリティ",
        "Exploit": "エクスプロイト",
        "Vulnerability": "脆弱性",
        "Hacking": "ハッキング",
        "Privacy": "プライバシー",

        # オープンソース
        "Open Source": "オープンソース",
        "OSS": "OSS",
        "Library": "ライブラリ",
        "Framework": "フレームワーク",

        # Web関連
        "Web": "Web",
        "HTML": "HTML",
        "CSS": "CSS",
        "React": "React",
        "Vue": "Vue",
        "Node": "Node",

        # インフラ・DevOps
        "DevOps": "DevOps",
        "Cloud": "クラウド",
        "AWS": "AWS",
        "GCP": "GCP",
        "Azure": "Azure",
        "Database": "データベース",
        "SQL": "SQL",

        # 開発プロセス
        "Testing": "テスト",
        "Performance": "パフォーマンス",
        "Optimization": "最適化",
        "Debugging": "デバッグ",
        "Refactor": "リファクタリング",
        "Release": "リリース",
        "Update": "アップデート",
        "Bug": "バグ",
        "Fix": "修正",
        "Feature": "機能",
        "Design": "デザイン",
        "Architecture": "アーキテクチャ",
        "Pattern": "パターン",

        # ビジネス関連
        "Startup": "スタートアップ",
        "SaaS": "SaaS",
        "Product": "プロダクト",
        "Business": "ビジネス",
        "Investment": "投資",
        "Revenue": "収益",

        # その他
        "Tutorial": "チュートリアル",
        "Guide": "ガイド",
        "Interview": "インタビュー",
        "Case Study": "ケーススタディ",
        "Analysis": "分析",
        "Research": "研究",
        "Tool": "ツール",
    }

    result = title

    # 大文字小文字の区別なく置換
    for en, ja in translations.items():
        # 単語境界を意識した置換
        pattern = r'\b' + re.escape(en) + r'\b'
        result = re.sub(pattern, ja, result, flags=re.IGNORECASE)

    return result

def organize_by_interest(entries: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
    """興味度でソート"""
    high = [e for e in entries if e.get("interest") == "★★★"]
    mid = [e for e in entries if e.get("interest") in ("★★", "★")]

    return high, mid

def generate_markdown(hatena: List[Dict], hn: List[Dict], reddit: List[Dict], qiita: List[Dict], zenn: List[Dict], additional: List[Dict]) -> str:
    """Markdownを生成"""
    md = f"# トレンドネタ: {DATE_STR}\n\n"

    # はてなブックマーク
    md += "## はてブIT（日本市場）\n\n"
    if hatena:
        high, mid = organize_by_interest(hatena)

        if high:
            md += "### 注目トピック\n\n"
            md += "| タイトル | ブクマ数 | 興味度 | カテゴリ |\n"
            md += "|---------|---------|--------|----------|\n"
            for e in high[:5]:
                md += f"| [{e['title']}]({e['url']}) | {e['count']} | {e['interest']} | {e['topic']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(hatena[:10], 1):
            md += f"{i}. [{e['title']}]({e['url']}) ({e['count']})\n"

    md += "\n"

    # Hacker News
    md += "## Hacker News（グローバル）\n\n"
    if hn:
        high, mid = organize_by_interest(hn)

        if high:
            md += "### 注目トピック\n\n"
            md += "| タイトル | ポイント | 興味度 | カテゴリ |\n"
            md += "|---------|---------|--------|----------|\n"
            for e in high[:5]:
                md += f"| [{e['title']}]({e['url']}) | {e['count']} | {e['interest']} | {e['topic']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(hn[:10], 1):
            md += f"{i}. [{e['title']}]({e['url']}) ({e['count']})\n"

    md += "\n"

    # Reddit
    if reddit:
        md += "## Reddit\n\n"
        md += "### 注目トピック\n\n"

        high, mid = organize_by_interest(reddit)
        if high:
            md += "| タイトル | 投票数 | コメント数 | 興味度 | サブレッド |\n"
            md += "|---------|--------|-----------|--------|----------|\n"
            for e in high[:5]:
                md += f"| [{e['title']}]({e['url']}) | {e['ups']} | {e['comments']} | {e['interest']} | r/{e['subreddit']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(reddit[:20], 1):
            md += f"{i}. [{e['title']}]({e['url']}) ({e['ups']} ups, {e['comments']} comments) - r/{e['subreddit']}\n"

    md += "\n"

    # Qiita
    if qiita:
        md += "## Qiita\n\n"
        high, mid = organize_by_interest(qiita)

        if high:
            md += "### 注目トピック\n\n"
            md += "| タイトル | 反応 | 興味度 | カテゴリ |\n"
            md += "|---------|---------|--------|----------|\n"
            for e in high[:5]:
                md += f"| [{e['title']}]({e['url']}) | {e['count']} | {e['interest']} | {e['topic']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(qiita[:10], 1):
            md += f"{i}. [{e['title']}]({e['url']}) ({e['count']})\n"
        md += "\n"

    # Zenn
    if zenn:
        md += "## Zenn\n\n"
        high, mid = organize_by_interest(zenn)

        if high:
            md += "### 注目トピック\n\n"
            md += "| タイトル | 興味度 | カテゴリ |\n"
            md += "|---------|--------|----------|\n"
            for e in high[:5]:
                md += f"| [{e['title']}]({e['url']}) | {e['interest']} | {e['topic']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(zenn[:10], 1):
            md += f"{i}. [{e['title']}]({e['url']})\n"

    md += "\n"

    # 追加ソース
    if additional:
        md += "## 追加ソース\n\n"
        high, mid = organize_by_interest(additional)

        if high:
            md += "### 注目トピック\n\n"
            md += "| タイトル | ソース | 興味度 | カテゴリ |\n"
            md += "|---------|--------|--------|----------|\n"
            for e in high[:10]:
                md += f"| [{e['title']}]({e['url']}) | {e['source']} | {e['interest']} | {e['topic']} |\n"
            md += "\n"

        md += "### 全エントリー\n\n"
        for i, e in enumerate(additional, 1):
            md += f"{i}. [{e['title']}]({e['url']}) - {e['source']}\n"

    return md

def main():
    import os

    print("トレンド情報を収集中...")
    print()

    # 各ソースから収集
    print("📰 各ソースからの取得状況:")

    hatena = fetch_hatena_bookmarks()
    print(f"  ✓ はてブ: {len(hatena)} 件")

    hn = fetch_hacker_news()
    print(f"  ✓ HN: {len(hn)} 件")

    reddit = fetch_reddit()
    print(f"  ✓ Reddit: {len(reddit)} 件")

    qiita = fetch_qiita()
    print(f"  ✓ Qiita: {len(qiita)} 件")

    zenn = fetch_zenn()
    print(f"  ✓ Zenn: {len(zenn)} 件")

    additional = fetch_additional_sources()
    print(f"  ✓ 追加ソース: {len(additional)} 件")

    total = len(hatena) + len(hn) + len(reddit) + len(qiita) + len(zenn) + len(additional)
    print(f"\n📊 合計: {total} 件")

    # ファイルディレクトリを確認
    output_dir = os.path.dirname(OUTPUT_FILE)
    os.makedirs(output_dir, exist_ok=True)

    # Markdown生成
    md = generate_markdown(hatena, hn, reddit, qiita, zenn, additional)

    # ファイルに保存
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write(md)
        print(f"\n✅ ネタ収集完了。")
        print(f"📁 出力: {OUTPUT_FILE}")
    except Exception as e:
        print(f"\n❌ ファイル保存エラー: {e}", file=sys.stderr)
        return False

    return True

if __name__ == "__main__":
    main()
