'use client'

import { motion } from 'framer-motion'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Section, SectionDivider } from './Section'
import { Testimonials } from './Testimonials'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

export function ProjectsPage() {
  useScrollDepth()

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Section
          id="projects"
          eyebrow="Work"
          title={
            <>
              Case studies{' '}
              <span className="font-display-italic text-muted-foreground">coming soon.</span>
            </>
          }
          subtitle="We're onboarding our first clients now. Real numbers, real businesses — published as results come in."
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="glass-card rounded-xl p-10 sm:p-16 text-center max-w-2xl mx-auto"
          >
            <div className="text-[15px] text-foreground/60 leading-relaxed">
              No stock results. No inflated averages.<br />
              First client progress will be published here as it happens.
            </div>
            <div className="mt-8 text-[12px] text-muted-foreground/40 font-mono tracking-wide uppercase">
              First few client case studies in progress
            </div>
          </motion.div>
        </Section>
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
