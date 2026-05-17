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

export default function Services() {
  return <ServicesPage />
}
