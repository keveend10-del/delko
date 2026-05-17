import type { Metadata } from 'next'
import { PricingPage } from '@/components/site/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Three local marketing plans starting at $1,500/mo. No setup fees, no long-term contracts. Foundation, Growth, and Dominate plans for Berkshire County and North Shore MA businesses.',
  openGraph: {
    title: 'Pricing | Delko',
    description: 'Three local marketing plans starting at $1,500/mo. No setup fees, no long-term contracts. Foundation, Growth, and Dominate plans for Berkshire County and North Shore MA businesses.',
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
        name: 'Foundation Plan',
        description: 'Get found and get calls. Google Business Profile optimization, website audit, review system, lead capture, and monthly reporting.',
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
        name: 'Growth Plan',
        description: 'Generate consistent leads. Everything in Foundation plus local SEO service pages, CRM setup, review generation, email/SMS follow-up, and content planning.',
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
        name: 'Dominate Plan',
        description: 'Own your market. Everything in Growth plus paid ad setup and management, advanced CRM/automation, reputation management, offer testing, and conversion tracking.',
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
