'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Problem } from './Problem'
import { Process } from './Process'
import { Services } from './Services'
import { Testimonials } from './Testimonials'
import { FAQ } from './FAQ'
import { Packages } from './Packages'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function LandingPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-surface/50">
          <Problem />
        </div>
        <Process />
        <div className="bg-surface/50">
          <Services compact />
        </div>
        <Testimonials />
        <div className="bg-surface/50">
          <FAQ />
        </div>
        <Packages />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
