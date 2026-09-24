import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JO Painting & Pressure Washing | Free Estimates',
  description: 'Professional pressure washing for driveways, siding, patios, decks, fences, and commercial properties in Newport County, Rhode Island. Free estimates and fast response.',
  keywords: ['pressure washing', 'power washing', 'house washing', 'driveway cleaning', 'patio cleaning', 'Newport County', 'Rhode Island', 'exterior cleaning'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'JO Painting & Pressure Washing',
    title: 'JO Painting & Pressure Washing | Free Estimates',
    description: 'Professional exterior cleaning for driveways, siding, patios, decks, and fences in Newport County, Rhode Island.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f2b544',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
