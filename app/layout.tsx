import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { CookieConsent } from '@/components/site/CookieConsent'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://delkoagency.com'),
  title: {
    default: 'Delko | More Calls. More Jobs.',
    template: '%s | Delko',
  },
  description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
  openGraph: {
    type: 'website',
    siteName: 'Delko',
    title: 'Delko | More Calls. More Jobs.',
    description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
    url: 'https://delkoagency.com',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Delko Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delko | More Calls. More Jobs.',
    description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Theme detection — runs before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=window.location.pathname;if(p.startsWith('/admin')){document.documentElement.classList.add('dark');}else{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
        {/* Google Consent Mode v2 — defaults must be set before GA4 loads */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <CookieConsent />
      </body>
      <GoogleAnalytics gaId="G-99VQR2F6E0" />
    </html>
  )
}
