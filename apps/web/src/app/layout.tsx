import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'AI Pulse — AI News Intelligence', template: '%s | AI Pulse' },
  description: 'Real-time AI news, model launches, research breakthroughs, and industry intelligence.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aipulse.c7corp.com'),
  openGraph: { type: 'website', siteName: 'AI Pulse' },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('pulse-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <div className="bg-atmosphere" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
