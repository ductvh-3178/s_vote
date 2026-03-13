import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { bootstrapApp } from '@/lib/bootstrap'
import './globals.css'

bootstrapApp()

export const metadata: Metadata = {
  title: 'S Vote',
  description: 'Voting application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
