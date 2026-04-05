import type { Metadata } from 'next'
import './globals.css'
import GlobalFloorLinks from '@/components/GlobalFloorLinks'
import GlobalHeader from '@/components/GlobalHeader'

export const metadata: Metadata = {
  title: 'PORTFOLIO | BMSG FES \'24 STYLE',
  description: 'ビルディング型ポートフォリオサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@100;400;700;900&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      </head>
      <body className="antialiased">
        <GlobalHeader />
        {children}
        <GlobalFloorLinks />
      </body>
    </html>
  )
} 
