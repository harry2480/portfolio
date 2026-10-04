import type { Dictionary } from './ja'

const zh: Dictionary = {
  languageSwitcher: {
    label: '显示语言',
  },
  floor01: {
    guideIntro: [
      '本网站把我的活动和作品比作一栋“大楼”来构建。从画面上的电梯选择楼层，即可查看该楼层的内容。',
      '欢迎随意参观。滚动页面时会出现文字和各种细节，还准备了一些隐藏内容。网站注重易读性和易用性，相信您可以直观地享受浏览。',
    ],
    guide: {
      works: '作品与项目展示区',
      skill: '技术栈',
      about: '经历与自我介绍',
      blog: '博客',
      github: 'Pull Request 活动记录',
      records: '黑客松参赛与 OSS 贡献记录',
    },
  },
  floor02: {
    descriptions: {
      neoCommerce:
        '大型电商网站改版项目。采用无头电商架构，大幅提升了前端性能。',
      corporateBranding:
        '科技企业的品牌网站。使用 WebGL 实现数据可视化，展现企业的先进性。',
      musicFestival:
        '大型音乐节的特设网站。实现了与售票系统的对接，以及时间表的实时更新功能。',
      aiDashboard:
        'AI 分析工具管理后台的 UI 设计与开发。设计了能够直观操作复杂参数设置的界面。',
    },
  },
  works: {
    subtitle: '作品一览',
    empty: '未找到仓库',
  },
  skill: {
    subtitle: '技术栈',
  },
  about: {
    subtitle: '经历与自我介绍',
    profile: '毕业于大阪工业大学知识产权学部知识产权学科。软件工程师。',
    concept:
      '我重视在有限条件下找出最优解的资源分配能力，以及作为“能影响他人的娱乐者”的姿态。为团队而行动、做出成果，是我的动力所在。',
    viewAllWorks: '查看全部作品',
    birdman: {
      title: '人力飞机项目',
      description: '担任宣传组组长，加强了网站的开发与运营。',
      tag: '网站运营',
    },
    shootingGame: {
      title: '3D 射击游戏（毕业作品）',
      description: '荣获最优秀奖。使用 Unity + Maya + Adobe CC，统筹了从策划、项目管理到开发实现的全过程。',
    },
    media: [
      { title: '接受关西地方电视节目采访', detail: '2022年6月、2023年6月 / 鸟人大赛相关' },
      { title: '读卖官方采访与地面电视播出', detail: '2024–2025年 / 播出精华版、采访及飞行影像' },
      { title: '参展2025年大阪・关西世博会', detail: '2025年 / 3天内吸引超过30,000名参观者' },
    ],
    interest: '音乐欣赏、看演唱会、编程（个人开发）',
    contact: '如有技术咨询、工作委托或合作意向，欢迎随时联系。',
  },
  blog: {
    subtitle: '关于技术、工程与日常生活的文章',
    backToList: '← 返回博客列表',
    notFoundTitle: '404 - 未找到文章',
    notFoundBody: '抱歉，您要找的文章不存在。',
  },
  github: {
    empty: '未找到 PR',
  },
  records: {
    subtitle: '活动记录',
    empty: '暂无记录',
  },
}

export default zh
