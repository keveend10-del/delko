import type { Metadata } from 'next'
import { AboutPage } from '@/components/site/AboutPage'

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Delko is different. We build context signals — not keyword lists — for local businesses in Berkshire County and the North Shore of Massachusetts.',
  openGraph: {
    title: 'About | Delko',
    description: 'Why Delko is different. We build context signals — not keyword lists — for local businesses in Berkshire County and the North Shore of Massachusetts.',
    url: 'https://delkoagency.com/about',
  },
  alternates: {
    canonical: 'https://delkoagency.com/about',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Delko',
  url: 'https://delkoagency.com',
  description: 'Local marketing agency built for Berkshire County and North Shore MA businesses.',
  areaServed: ['Berkshire County, MA', 'North Shore, MA'],
}

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <AboutPage />
    </>
  )
}
