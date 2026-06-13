'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { SectionDivider } from './Section'
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
        <div className="container mx-auto px-5 sm:px-8 py-4">
          <h2 className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-muted-foreground/50">
            Local growth agency for North Shore &amp; Berkshire County, MA
          </h2>
        </div>
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Services compact />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Packages />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
