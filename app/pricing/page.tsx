import type { Metadata } from 'next'
import { PricingPage } from '@/components/site/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Three local marketing plans starting at $1,500/mo. No setup fees, month-to-month. Starter Presence, Local Growth System, and Growth Partner plans for North Shore and Berkshire County MA businesses.',
  openGraph: {
    title: 'Pricing | Delko',
    description: 'Three local marketing plans starting at $1,500/mo. No setup fees, month-to-month. Starter Presence, Local Growth System, and Growth Partner plans for North Shore and Berkshire County MA businesses.',
    url: 'https://delkoagency.com/pricing',
  },
  alternates: {
    canonical: 'https://delkoagency.com/pricing',
  },
}

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Local Marketing Plans',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'Starter Presence',
        description: 'Fix the basics and start getting found. Google Business Profile cleanup, website audit and basic fixes, review request system, lead capture form, and monthly report.',
        offers: {
          '@type': 'Offer',
          price: '1500',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1500',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Local Growth System',
        description: 'More calls, better visibility. Everything in Starter Presence plus landing page or website refresh, local SEO service pages, review generation system, lead capture forms, email and SMS follow-up, monthly strategy call, and AI search readiness.',
        offers: {
          '@type': 'Offer',
          price: '2500',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '2500',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Product',
        name: 'Growth Partner',
        description: 'Full customer acquisition system. Everything in Local Growth System plus paid ads, CRM setup, advanced automations, campaign landing pages, reputation management, offer testing, and detailed reporting.',
        offers: {
          '@type': 'Offer',
          price: '4500',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '4500',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
      },
    },
  ],
}

export default function Pricing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <PricingPage />
    </>
  )
}
