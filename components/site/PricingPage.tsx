'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Packages } from './Packages'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function PricingPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <section className="pt-36 pb-0">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="eyebrow mb-6">Pricing</div>
            <h1 className="text-[40px] sm:text-[58px] lg:text-[74px] font-bold leading-[1.0] tracking-[-0.04em] max-w-3xl">
              Website, AI search, social, and workflows —{' '}
              <span className="font-display-italic text-muted-foreground">
                one team, one plan.
              </span>
            </h1>
            <p className="mt-6 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-2xl">
              Three monthly plans covering all four pillars for Berkshire County and North Shore MA businesses. No setup fees, no long contracts, no handoffs.
            </p>
          </div>
        </section>
        <Packages />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
