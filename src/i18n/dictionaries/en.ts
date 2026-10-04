import type { Dictionary } from './ja'

const en: Dictionary = {
  languageSwitcher: {
    label: 'Display language',
  },
  floor01: {
    guideIntro: [
      'This site is built as a "building" that houses my activities and works. Choose a floor from the on-screen elevator to see what is on that floor.',
      'Feel free to look around. Text and small details appear as you scroll, and there are a few hidden surprises as well. I have put readability and ease of use first, so it should feel intuitive to explore.',
    ],
    guide: {
      works: 'A showcase of my work and projects',
      skill: 'Tech stack',
      about: 'Background and profile',
      blog: 'Blog',
      github: 'Pull request activity log',
      records: 'Hackathon entries and OSS contributions',
    },
  },
  floor02: {
    descriptions: {
      neoCommerce:
        'Renewal of a large-scale e-commerce site. Adopted a headless commerce architecture and dramatically improved front-end performance.',
      corporateBranding:
        'Branding site for a tech company. Implemented WebGL data visualizations to express the company’s forward-looking vision.',
      musicFestival:
        'Special site for a major music festival. Implemented ticketing system integration and real-time timetable updates.',
      aiDashboard:
        'UI design and implementation of the admin dashboard for an AI analytics tool. Designed an interface that makes complex parameter settings intuitive.',
    },
  },
  works: {
    subtitle: 'Project list',
    empty: 'No repositories found',
  },
  skill: {
    subtitle: 'Tech stack',
  },
  about: {
    subtitle: 'Background and profile',
    profile:
      'Graduated from the Department of Intellectual Property, Faculty of Intellectual Property, Osaka Institute of Technology. Software engineer.',
    concept:
      'I value the ability to allocate limited resources to find the best solution under constraints, and the mindset of an "entertainer" who influences others. I find fulfillment in working for my team and delivering results.',
    viewAllWorks: 'View all works',
    birdman: {
      title: 'Human-Powered Aircraft Project',
      description: 'As PR team leader, strengthened the development and operation of the team website.',
      tag: 'Website operations',
    },
    shootingGame: {
      title: '3D Shooting Game (Graduation Project)',
      description:
        'Won the Grand Prize. Led everything from planning and project management to implementation with Unity, Maya, and Adobe CC.',
    },
    media: [
      {
        title: 'Featured on a Kansai local TV program',
        detail: 'June 2022, June 2023 / Related to the Japan International Birdman Rally',
      },
      {
        title: 'Official Yomiuri coverage and terrestrial TV broadcast',
        detail: '2024–2025 / Digest, interview, and flight footage aired',
      },
      {
        title: 'Exhibited at Expo 2025 Osaka, Kansai',
        detail: '2025 / Drew more than 30,000 visitors over 3 days',
      },
    ],
    interest: 'Music, live concerts, programming (personal projects)',
    contact: 'Feel free to get in touch about technical questions, work requests, or collaborations.',
  },
  blog: {
    subtitle: 'Articles on technology, engineering, and everyday life',
    backToList: '← Back to blog list',
    notFoundTitle: '404 - Article not found',
    notFoundBody: 'Sorry, the article you are looking for does not exist.',
  },
  github: {
    empty: 'No PRs found',
  },
  records: {
    subtitle: 'Activity log',
    empty: 'No records yet',
  },
}

export default en
