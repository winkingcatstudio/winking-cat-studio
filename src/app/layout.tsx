import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'


export const metadata: Metadata = {
  title: {
    template: '%s - Dan Kercher',
    default: 'Winking Cat Studio - Software Development and Game Design',
  },
  description: `Hi! I'm Dan Kercher, a software developer and tabletop roleplaying game designer. I started Winking Cat Studio as a way to organize my personal, academic, and professional projects.`,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Winking Cat Studio - Software Development and Game Design',
    description: `Hi! I'm Dan Kercher, a software developer and tabletop roleplaying game designer.`,
    url: 'https://winkingcatstudio.com',
    siteName: 'Winking Cat Studio',
    images: [
      {
        url: 'https://winkingcatstudio.com/images/winkingcatlogo-white-on-black.png',
        width: 1200,
        height: 630,
      }
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
