import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Berk Growth Co. | More Calls. More Jobs.',
  description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
