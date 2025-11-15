import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eigenbird',
  description: 'Digital design studio crafting immersive experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

