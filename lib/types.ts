export type Package = 'starter' | 'growth' | 'dominate'
export type SubscriptionStatus = 'pending' | 'active' | 'past_due' | 'canceled'

export interface Client {
  id: string
  slug: string
  name: string
  business_name: string
  email: string
  package: Package
  custom_scope: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: SubscriptionStatus
  signed_at: string | null
  signer_name: string | null
  signer_date: string | null
  created_at: string
  updated_at: string
}

export interface MonthlyMetrics {
  id: string
  client_id: string
  month_year: string
  leads_generated: number
  cost_per_lead: number
  ranking_movement: number
  new_reviews: number
  ad_spend: number
  ad_budget: number
  next_steps: string | null
  created_at: string
}

export interface PackageConfig {
  name: string
  price: number
  tagline: string
  features: string[]
}

export const PACKAGES: Record<Package, PackageConfig> = {
  starter: {
    name: 'Starter',
    price: 1500,
    tagline: 'Get found locally.',
    features: [
      'Google Business Profile optimization',
      'Local SEO (title tags + local content)',
      'Review generation system',
      'Monthly performance report',
    ],
  },
  growth: {
    name: 'Growth',
    price: 2500,
    tagline: 'Generate consistent leads.',
    features: [
      'Everything in Starter, plus:',
      'Google Local Services Ads (setup + management)',
      'Google Search Ads management',
      'Lead follow-up email sequence + CRM setup',
      'Bi-weekly strategy calls',
    ],
  },
  dominate: {
    name: 'Dominate',
    price: 4500,
    tagline: 'Own your market.',
    features: [
      'Everything in Growth, plus:',
      'Meta Ads (Facebook + Instagram)',
      'Monthly landing page builds',
      '2 blog posts per month',
      'Weekly calls + full reporting',
      'Dedicated account manager',
    ],
  },
}
