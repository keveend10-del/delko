'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { SectionDivider } from './Section'
import { Services } from './Services'
import { Process } from './Process'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function ServicesPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Services />
        <SectionDivider />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
