import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SiteChrome } from '@/components/site-chrome'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vantage Logistics | Freight, warehousing and customs',
    template: '%s | Vantage Logistics',
  },
  description:
    'Air freight, ocean freight, road transport, warehousing and customs clearance for businesses and individuals. Track any shipment online.',
  generator: 'v0.app',
  keywords: [
    'logistics',
    'freight',
    'shipping',
    'air freight',
    'ocean freight',
    'supply chain',
    'warehousing',
    'customs clearance',
  ],
  openGraph: {
    title: 'Vantage Logistics | Freight, warehousing and customs',
    description:
      'Air, ocean and road freight, warehousing and customs clearance. Track any shipment online.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#152e40',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${jakarta.variable} ${space.variable}`}>
      <body className="antialiased font-sans flex min-h-screen flex-col bg-background text-foreground">
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteChrome>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
