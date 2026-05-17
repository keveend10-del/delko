import type { Metadata } from 'next'
import { LandingPage } from '@/components/site/LandingPage'

export const metadata: Metadata = {
  title: 'Delko | More Calls. More Jobs.',
  description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
  openGraph: {
    title: 'Delko | More Calls. More Jobs.',
    description: 'Websites, ads, and Google profiles that bring more calls to local businesses across Berkshire County and the North Shore of Massachusetts.',
    url: 'https://delkoagency.com',
  },
  alternates: {
    canonical: 'https://delkoagency.com',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Delko',
  url: 'https://delkoagency.com',
  description: 'Local marketing agency serving Berkshire County and North Shore MA. Websites, Google Business Profile optimization, local SEO, and paid ads.',
  areaServed: ['Berkshire County, MA', 'North Shore, MA'],
  serviceType: ['Local SEO', 'Google Business Profile Optimization', 'Paid Advertising', 'Website Design'],
  priceRange: '$1,500–$4,500/mo',
  sameAs: [],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Delko',
  url: 'https://delkoagency.com',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What areas does Delko serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delko serves local businesses across Berkshire County MA (Pittsfield, Lenox, Stockbridge, Great Barrington, Williamstown) and the North Shore of Massachusetts (Salem, Marblehead, Gloucester, Beverly, Newburyport).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does local marketing cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delko offers three plans starting at $1,500/mo (Foundation), $2,500/mo (Growth), and $4,500/mo (Dominate). No setup fees, no long-term contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in local SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Local SEO at Delko includes Google Business Profile optimization, context-first on-page SEO, schema markup, citation building, and monthly signal maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you require long-term contracts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All Delko plans are month-to-month with no setup fees and no long-term contracts.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage />
    </>
  )
}
