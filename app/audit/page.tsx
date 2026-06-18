import type { Metadata } from 'next'
import { AuditPage } from '@/components/site/AuditPage'

export const metadata: Metadata = {
  title: 'Free AI Visibility Audit',
  description: 'Find out exactly where your business stands in Google, AI search, and local results. Delko reviews your Google profile, website, reviews, and AI visibility — free, no pitch.',
  openGraph: {
    title: 'Free AI Visibility Audit | Delko',
    description: 'Find out where your business stands in Google, AI search, and local results. Free audit, back to you in 1–2 days.',
    url: 'https://delkoagency.com/audit',
  },
  alternates: {
    canonical: 'https://delkoagency.com/audit',
  },
}

const auditSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free AI Visibility Audit',
  description: 'A free audit of your Google Business Profile, website, reviews, local SEO, and AI search visibility. Delko checks how your business appears in Google, ChatGPT, Perplexity, and Google AI.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Delko',
    url: 'https://delkoagency.com',
  },
  areaServed: ['Berkshire County, MA', 'North Shore, MA'],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free AI visibility audit for local businesses in Berkshire County and North Shore MA',
  },
}

export default function Audit() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditSchema) }}
      />
      <AuditPage />
    </>
  )
}
