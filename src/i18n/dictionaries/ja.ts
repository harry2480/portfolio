const ja = {
  languageSwitcher: {
    label: '表示言語',
  },
  floor01: {
    guideIntro: [
      'このサイトは、自分の活動や作品を「ビル」に見立てて構成しています。画面上のエレベーターからフロアを選ぶと、そのフロアの内容が表示されます。',
      '気軽に見て回ってください。スクロールでテキストや細かい要素が現れますし、隠しコンテンツもいくつか用意しています。読みやすさ・操作性を大事にしているので、直感的に楽しめるはずです。',
    ],
    guide: {
      works: '制作実績・プロジェクトの展示エリア',
      skill: '技術スタック',
      about: '経歴・自己紹介',
      blog: 'ブログ',
      github: 'Pull Request の活動ログ',
      records: 'ハッカソン出場・OSS コントリビュートの記録',
    },
  },
  floor02: {
    descriptions: {
      neoCommerce:
        '大規模ECサイトのリニューアルプロジェクト。ヘッドレスコマースアーキテクチャを採用し、フロントエンドのパフォーマンスを劇的に改善。',
      corporateBranding:
        'テック企業のブランディングサイト。WebGLを用いたデータビジュアライゼーションを実装し、企業の先進性を表現。',
      musicFestival:
        '大型音楽フェスの特設サイト。チケット販売システムとの連携および、タイムテーブルのリアルタイム更新機能を実装。',
      aiDashboard:
        'AI解析ツールの管理画面UIデザインおよび実装。複雑なパラメータ設定を直感的に操作できるインターフェースを設計。',
    },
  },
  works: {
    subtitle: '作品一覧',
    empty: 'リポジトリが見つかりません',
  },
  skill: {
    subtitle: '技術スタック',
  },
  about: {
    subtitle: '経歴・自己紹介',
    profile: '大阪工業大学知的財産学部知的財産学科卒業。ソフトウェアエンジニア。',
    concept:
      '制限条件下で最適解を見つけ出すリソース配分能力と、「他者への影響力・エンターテイナー」としての姿勢を大切にしています。チームのために動き、実績を残すことにやりがいを感じます。',
    viewAllWorks: '全作品を見る',
    birdman: {
      title: '人力飛行機プロジェクト',
      description: '広報班長としてWebページ開発・運用を強化。',
      tag: 'Webサイト運用',
    },
    shootingGame: {
      title: '3D シューティングゲーム（卒業制作）',
      description: '最優秀賞受賞。Unity + Maya + Adobe CC で企画・PM から実装まで統括。',
    },
    media: [
      { title: '関西ローカル番組 取材', detail: '2022年6月、2023年6月 / 鳥人間コンテスト関連' },
      { title: '読売公式取材・地上波放映', detail: '2024-2025年 / ダイジェスト・取材映像・フライト映像を放映' },
      { title: '大阪関西万博 出展', detail: '2025年 / 3日間で30,000人超の来場者を動員' },
    ],
    interest: '音楽鑑賞、LIVE、プログラミング（個人開発）',
    contact: '技術相談、お仕事のご依頼、あるいはコラボレーションについてお気軽にご連絡ください。',
  },
  blog: {
    subtitle: '技術やエンジニアリング、日常についての記事',
    backToList: '← ブログ一覧に戻る',
    notFoundTitle: '404 - 記事が見つかりません',
    notFoundBody: '申し訳ありません。お探しの記事は存在しません。',
  },
  github: {
    empty: 'PR が見つかりません',
  },
  records: {
    subtitle: '活動記録',
    empty: 'まだ記録がありません',
  },
} as const

// 文字列リテラルを string に広げ、構造（キー・配列の長さ）だけを他言語に強制する
type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof ja>

const dictionary: Dictionary = ja

export default dictionary
