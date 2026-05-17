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
            <div className="eyebrow mb-6">Pricing / 03 Plans</div>
            <h1 className="text-[40px] sm:text-[58px] lg:text-[74px] font-bold leading-[1.0] tracking-[-0.04em] max-w-3xl">
              Local marketing plans for{' '}
              <span className="font-display-italic text-muted-foreground">
                Berkshire County &amp; North Shore MA
              </span>
            </h1>
            <p className="mt-6 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-2xl">
              Three plans, no long contracts, no setup fees. Cancel month-to-month if it isn&apos;t working — but it will.
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
