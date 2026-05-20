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
      name: "I've tried Facebook ads before and they didn't work.",
      acceptedAnswer: { '@type': 'Answer', text: "Facebook finds people who might be interested. We find people already searching for your service right now in Pittsfield, Salem, or wherever you work. Different intent, completely different result." },
    },
    {
      '@type': 'Question',
      name: 'How long until I start seeing results?',
      acceptedAnswer: { '@type': 'Answer', text: 'Google profile fixes show movement in 4–8 weeks. Paid ads can ring your phone in week one. At 30 days we send you an honest update on exactly what is moving.' },
    },
    {
      '@type': 'Question',
      name: 'Do I actually need a new website?',
      acceptedAnswer: { '@type': 'Answer', text: 'Not always. We audit what you have first. If it is fast, mobile-friendly, and people can call you in two taps, we work with it. If it is costing you jobs, we show you exactly why.' },
    },
    {
      '@type': 'Question',
      name: 'Am I locked into a contract?',
      acceptedAnswer: { '@type': 'Answer', text: 'Month-to-month only. No 12-month lock-ins, no cancellation fees. We stay because the work actually works.' },
    },
    {
      '@type': 'Question',
      name: 'What areas does Delko serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Delko serves local businesses in Berkshire County MA (Pittsfield, Lenox, Stockbridge, Great Barrington, Lee, Williamstown, Adams, Dalton) and the North Shore of Massachusetts (Salem, Beverly, Marblehead, Gloucester, Newburyport, Ipswich, Rockport).' },
    },
    {
      '@type': 'Question',
      name: "What's the difference between your three packages?",
      acceptedAnswer: { '@type': 'Answer', text: 'Foundation gets your Google profile and website working together to bring in calls at $1,500/mo. Growth adds a review system, email follow-up, and local SEO pages at $2,500/mo. Dominate adds paid ads, CRM automation, and conversion tracking at $4,500/mo.' },
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
