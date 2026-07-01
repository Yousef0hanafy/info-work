import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import { Providers } from '@/components/layout/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Infeworks — Engineering Water Intelligence',
  description: 'Turnkey water treatment, electromechanical, and civil infrastructure across Egypt and the MENA region.',
  icons: {
    icon: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Infeworks — Engineering Water Intelligence',
    description: 'From design to commissioning — we deliver turnkey water treatment, electromechanical, and civil infrastructure projects across Egypt and the MENA region.',
    siteName: 'Infeworks',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}