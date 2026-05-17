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

export default function About() {
  return <AboutPage />
}
