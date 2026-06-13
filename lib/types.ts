export type Package = 'digital cleanup' | 'website + social rebuild' | 'monthly growth support' | 'foundation' | 'growth' | 'dominate'
export type SubscriptionStatus = 'pending' | 'active' | 'past_due' | 'canceled'

export interface Client {
  id: string
  slug: string
  customer_user_id: string | null
  name: string | null
  business_name: string
  email: string
  package: Package | null
  custom_scope: string | null
  contact_name: string | null
  phone: string | null
  town: string | null
  business_type: string | null
  website: string | null
  instagram: string | null
  package_purchased: string | null
  project_value: number | null
  monthly_retainer_value: number | null
  start_date: string | null
  client_status: string | null
  payment_status: string | null
  project_status: string | null
  notes: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: SubscriptionStatus | null
  pending_checkout_url: string | null
  signed_at: string | null
  signer_name: string | null
  signer_date: string | null
  onboarding_completed: string[]
  created_at: string
  updated_at: string | null
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
  'digital cleanup': {
    name: 'Digital Cleanup',
    price: 0,
    tagline: '',
    features: [],
  },
  'website + social rebuild': {
    name: 'Website + Social Rebuild',
    price: 0,
    tagline: '',
    features: [],
  },
  'monthly growth support': {
    name: 'Monthly Growth Support',
    price: 0,
    tagline: '',
    features: [],
  },
  foundation: {
    name: 'Foundation',
    price: 1500,
    tagline: 'Get found and get calls.',
    features: [
      'Google Business Profile optimization',
      'Website / landing page audit',
      'Basic website fixes',
      'Review request system',
      'Lead capture form',
      'Simple follow-up workflow',
      'Monthly reporting',
      'Monthly strategy call',
    ],
  },
  growth: {
    name: 'Growth',
    price: 2500,
    tagline: 'Generate consistent leads.',
    features: [
      'Everything in Foundation, plus:',
      'Landing page or website refresh',
      'Local SEO service pages',
      'CRM setup',
      'Review generation system',
      'Email / SMS follow-up',
      'Content planning',
      'Basic ads readiness',
      'Monthly growth call',
    ],
  },
  dominate: {
    name: 'Dominate',
    price: 4500,
    tagline: 'Own your market.',
    features: [
      'Everything in Growth, plus:',
      'Paid ad setup and management',
      'Campaign landing pages',
      'Advanced CRM / automation',
      'Reputation management',
      'Offer testing',
      'Conversion tracking',
      'Detailed reporting',
      'Biweekly strategy calls',
    ],
  },
}

export type OnboardingTaskKey =
  | 'business_info'
  | 'gbp_access'
  | 'website_access'
  | 'brand_assets'
  | 'review_link'
  | 'tracking_setup'
  | 'kickoff_call'

export const ONBOARDING_TASKS: { key: OnboardingTaskKey; label: string; description: string }[] = [
  { key: 'business_info', label: 'Business info submitted', description: 'Name, address, phone, hours, and service area confirmed.' },
  { key: 'gbp_access', label: 'Google Business Profile access', description: 'Manager access granted to your Google Business Profile.' },
  { key: 'website_access', label: 'Website / CMS access', description: 'Login credentials or editor access to your website provided.' },
  { key: 'brand_assets', label: 'Brand assets uploaded', description: 'Logo, brand colors, and any existing creative shared.' },
  { key: 'review_link', label: 'Review link created', description: 'Direct Google review link confirmed and tested.' },
  { key: 'tracking_setup', label: 'Tracking setup confirmed', description: 'Google Analytics / call tracking verified.' },
  { key: 'kickoff_call', label: 'Kickoff call scheduled', description: 'First strategy call booked within 48 hours of sign-up.' },
]
