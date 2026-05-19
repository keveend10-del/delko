'use client'

import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { SectionDivider } from './Section'
import { WhyDifferent } from './WhyDifferent'
import { WhoWeAre } from './WhoWeAre'
import { Sway } from './Sway'
import { BeforeAfter } from './BeforeAfter'
import { LocalFocus } from './LocalFocus'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function AboutPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <WhyDifferent />
        <SectionDivider />
        <WhoWeAre />
        <SectionDivider />
        <Sway />
        <SectionDivider />
        <BeforeAfter />
        <SectionDivider />
        <LocalFocus />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
