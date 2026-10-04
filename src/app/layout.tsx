import type { Metadata } from 'next'
import './globals.css'
import GlobalFloorLinks from '@/components/GlobalFloorLinks'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalElevatorDoors from '@/components/GlobalElevatorDoors'
import CodeBackground from '@/components/CodeBackground'
import { I18nProvider } from '@/i18n/I18nProvider'
import { localeScript } from '@/i18n/localeScript'

export const metadata: Metadata = {
  title: 'PORTFOLIO | BMSG FES \'24 STYLE',
  description: 'ビルディング型ポートフォリオサイト',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" data-locale="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@100;400;700;900&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      </head>
      <body className="antialiased">
        <I18nProvider>
          <CodeBackground />
          <GlobalElevatorDoors />
          <GlobalHeader />
          {children}
          <GlobalFloorLinks />
        </I18nProvider>
      </body>
    </html>
  )
} 
