import type { Metadata } from 'next'
import { LandingPage } from '@/components/site/LandingPage'

export const metadata: Metadata = {
  title: 'Delko | Local Marketing Systems for North Shore & Berkshire County MA',
  description: 'Delko helps local businesses get found online, look more trustworthy, and follow up with leads faster — so more searches turn into real customers. Serving North Shore and Berkshire County MA.',
  openGraph: {
    title: 'Delko | Local Marketing Systems for North Shore & Berkshire County MA',
    description: 'Delko helps local businesses get found online, look more trustworthy, and follow up with leads faster — so more searches turn into real customers. Serving North Shore and Berkshire County MA.',
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
  description: 'Local growth agency serving North Shore and Berkshire County, MA. Google Business Profile optimization, local SEO, website design, lead capture, AI search visibility, and automated follow-up systems.',
  areaServed: ['North Shore, MA', 'Berkshire County, MA'],
  serviceType: ['Local SEO', 'Google Business Profile Optimization', 'Website Design', 'Lead Generation', 'AI Search Visibility', 'Customer Follow-Up Automation'],
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
      name: 'What is local AI visibility and why does it matter?',
      acceptedAnswer: { '@type': 'Answer', text: 'Search is changing fast. People are asking Google AI, ChatGPT, and Gemini who they should trust. These tools pull from your website, reviews, Google profile, and local data. If that information is incomplete or thin, you get skipped — even if you rank on the regular results page.' },
    },
    {
      '@type': 'Question',
      name: 'How long until I start seeing results?',
      acceptedAnswer: { '@type': 'Answer', text: 'Google profile fixes show movement in 4–8 weeks. Website and review improvements compound from there. At 30 days we send you an honest update on exactly what is moving.' },
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
      acceptedAnswer: { '@type': 'Answer', text: 'Delko serves local businesses across the North Shore of Massachusetts (Salem, Beverly, Marblehead, Gloucester, Newburyport, Ipswich, Rockport) and Berkshire County MA (Pittsfield, Lenox, Stockbridge, Great Barrington, Lee, Williamstown, Adams, Dalton).' },
    },
    {
      '@type': 'Question',
      name: "What's the difference between your three packages?",
      acceptedAnswer: { '@type': 'Answer', text: 'Starter Presence fixes the basics — Google profile, website, reviews, and lead capture at $1,500/mo. Local Growth System adds a website refresh, local SEO service pages, review generation, follow-up automation, and AI search readiness at $2,500/mo. Growth Partner adds paid ads, CRM setup, advanced automations, and reputation management at $4,500/mo.' },
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
