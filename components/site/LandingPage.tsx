'use client'

import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { SectionDivider } from './Section'
import { Problem } from './Problem'
import { WhyDifferent } from './WhyDifferent'
import { Services } from './Services'
import { Process } from './Process'
import { Packages } from './Packages'
import { Sway } from './Sway'
import { BeforeAfter } from './BeforeAfter'
import { LocalFocus } from './LocalFocus'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <WhyDifferent />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Packages />
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
