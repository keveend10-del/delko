import type { Metadata } from 'next'
import { ServicesPage } from '@/components/site/ServicesPage'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Local marketing services built for how Google works now. Website builds, Google Business Profile, local SEO, social presence, content, and monthly retainers.',
  openGraph: {
    title: 'Services | Delko',
    description: 'Local marketing services built for how Google works now. Website builds, Google Business Profile, local SEO, social presence, content, and monthly retainers.',
    url: 'https://delkoagency.com/services',
  },
  alternates: {
    canonical: 'https://delkoagency.com/services',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Local Marketing',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Delko',
    url: 'https://delkoagency.com',
  },
  areaServed: ['Berkshire County, MA', 'North Shore, MA'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Local Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design & Build' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Business Profile Optimization' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Context-First Local SEO' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Presence Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content From Real Jobs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Monthly Signal Maintenance' } },
    ],
  },
}

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesPage />
    </>
  )
}
