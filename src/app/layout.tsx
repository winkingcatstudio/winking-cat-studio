import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'


export const metadata: Metadata = {
  title: {
    template: '%s - Dan Kercher',
    default: 'Winking Cat Studio - Software Development and Game Design',
  },
  description: `Hi! I'm Dan Kercher, a software developer and tabletop roleplaying game designer located in Indianapolis, Indiana. I started Winking Cat Studio as a way to organize my personal, academic, and professional projects.`,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
}

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
