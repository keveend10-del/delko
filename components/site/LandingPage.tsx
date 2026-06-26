'use client'

import dynamic from 'next/dynamic'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProofBar } from './ProofBar'
import { Services } from './Services'

const Problem = dynamic(() => import('./Problem').then(m => ({ default: m.Problem })))
const Process = dynamic(() => import('./Process').then(m => ({ default: m.Process })))
const Testimonials = dynamic(() => import('./Testimonials').then(m => ({ default: m.Testimonials })))
const CampaignSection = dynamic(() => import('./CampaignSection').then(m => ({ default: m.CampaignSection })))
const FAQ = dynamic(() => import('./FAQ').then(m => ({ default: m.FAQ })))
const CTASection = dynamic(() => import('./CTASection').then(m => ({ default: m.CTASection })))
const Footer = dynamic(() => import('./Footer').then(m => ({ default: m.Footer })))

export function LandingPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <ProofBar />
        <Problem />
        <div className="bg-surface/50">
          <Services compact />
        </div>
        <div className="bg-surface/50">
          <Process />
        </div>
        <Testimonials />
        <CampaignSection />
        <div className="bg-surface/50">
          <FAQ limit={6} />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
