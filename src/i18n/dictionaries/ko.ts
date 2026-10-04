import type { Dictionary } from './ja'

const ko: Dictionary = {
  languageSwitcher: {
    label: '표시 언어',
  },
  floor01: {
    guideIntro: [
      '이 사이트는 저의 활동과 작품을 하나의 ‘빌딩’에 비유해 구성했습니다. 화면의 엘리베이터에서 층을 고르면 그 층의 내용이 표시됩니다.',
      '편하게 둘러보세요. 스크롤하면 텍스트와 세세한 요소가 나타나고, 숨겨진 콘텐츠도 몇 가지 준비해 두었습니다. 읽기 쉬움과 조작성을 중요하게 생각했기 때문에 직관적으로 즐기실 수 있을 거예요.',
    ],
    guide: {
      works: '제작 실적・프로젝트 전시 공간',
      skill: '기술 스택',
      about: '경력・자기소개',
      blog: '블로그',
      github: 'Pull Request 활동 로그',
      records: '해커톤 참가・OSS 기여 기록',
    },
  },
  floor02: {
    descriptions: {
      neoCommerce:
        '대규모 이커머스 사이트 리뉴얼 프로젝트. 헤드리스 커머스 아키텍처를 도입해 프런트엔드 성능을 크게 개선.',
      corporateBranding:
        '테크 기업의 브랜딩 사이트. WebGL을 활용한 데이터 시각화를 구현해 기업의 선진성을 표현.',
      musicFestival:
        '대형 음악 페스티벌 특설 사이트. 티켓 판매 시스템 연동과 타임테이블 실시간 업데이트 기능을 구현.',
      aiDashboard:
        'AI 분석 도구 관리 화면의 UI 디자인 및 구현. 복잡한 파라미터 설정을 직관적으로 조작할 수 있는 인터페이스를 설계.',
    },
  },
  works: {
    subtitle: '작품 목록',
    empty: '저장소를 찾을 수 없습니다',
  },
  skill: {
    subtitle: '기술 스택',
  },
  about: {
    subtitle: '경력・자기소개',
    profile: '오사카공업대학 지적재산학부 지적재산학과 졸업. 소프트웨어 엔지니어.',
    concept:
      '제약 조건 속에서 최적의 해답을 찾아내는 자원 배분 능력과, ‘타인에게 영향을 주는 엔터테이너’로서의 자세를 소중히 여깁니다. 팀을 위해 움직이고 성과를 남기는 데서 보람을 느낍니다.',
    viewAllWorks: '전체 작품 보기',
    birdman: {
      title: '인력 비행기 프로젝트',
      description: '홍보반장으로서 웹페이지 개발・운영을 강화.',
      tag: '웹사이트 운영',
    },
    shootingGame: {
      title: '3D 슈팅 게임(졸업 작품)',
      description: '최우수상 수상. Unity + Maya + Adobe CC로 기획・PM부터 구현까지 총괄.',
    },
    media: [
      { title: '간사이 지역 방송 프로그램 취재', detail: '2022년 6월, 2023년 6월 / 버드맨 콘테스트(鳥人間コンテスト) 관련' },
      { title: '요미우리 공식 취재・지상파 방영', detail: '2024–2025년 / 하이라이트・취재 영상・비행 영상 방영' },
      { title: '2025 오사카・간사이 엑스포 전시 참가', detail: '2025년 / 3일간 30,000명 이상의 방문객 동원' },
    ],
    interest: '음악 감상, 라이브 공연, 프로그래밍(개인 개발)',
    contact: '기술 상담, 업무 의뢰, 협업 등 무엇이든 편하게 연락 주세요.',
  },
  blog: {
    subtitle: '기술과 엔지니어링, 일상에 관한 글',
    backToList: '← 블로그 목록으로 돌아가기',
    notFoundTitle: '404 - 글을 찾을 수 없습니다',
    notFoundBody: '죄송합니다. 찾으시는 글이 존재하지 않습니다.',
  },
  github: {
    empty: 'PR을 찾을 수 없습니다',
  },
  records: {
    subtitle: '활동 기록',
    empty: '아직 기록이 없습니다',
  },
}

export default ko
