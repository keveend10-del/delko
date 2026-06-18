'use client'

import { motion } from 'framer-motion'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { AuditForm } from './AuditForm'
import { Search, Bot, Star, Globe, MapPin, BarChart2, CheckCircle2 } from 'lucide-react'

const whatWeCheck = [
  { icon: MapPin, label: 'Google Business Profile', desc: 'Completeness, categories, photos, Q&A, and post activity' },
  { icon: Bot, label: 'AI Search Visibility', desc: 'How ChatGPT, Perplexity, and Google AI describe your business' },
  { icon: Globe, label: 'Website Speed & Mobile', desc: 'Load time, mobile layout, call buttons, and conversion gaps' },
  { icon: Star, label: 'Reviews & Reputation', desc: 'Volume, recency, response rate, and sentiment signals' },
  { icon: Search, label: 'Local SEO & Citations', desc: 'Service pages, schema markup, and directory consistency' },
  { icon: BarChart2, label: 'Competitor Comparison', desc: 'Where you stand vs. the top 3 results in your market' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export function AuditPage() {
  useScrollDepth()
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 30% 30%, hsl(var(--accent) / 0.1), transparent 65%)' }} />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
            }}
          />
          <div className="container mx-auto px-5 sm:px-8 relative">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">

              {/* Left: pitch */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="lg:sticky lg:top-32"
              >
                <motion.div variants={fadeUp} className="eyebrow mb-8">Free · No pitch deck · Back to you in 1–2 days</motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-[44px] sm:text-[64px] lg:text-[74px] font-bold leading-[1.0] tracking-[-0.04em]"
                >
                  Find out exactly{' '}
                  <span className="font-display-italic text-muted-foreground">where you stand</span>{' '}
                  in Google and AI search.
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-7 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-lg">
                  Most local businesses don&apos;t know they&apos;re being skipped by AI tools — not because their work is bad, but because their online presence doesn&apos;t give those tools enough to work with. We check everything and send you a clear report.
                </motion.p>

                <motion.div variants={stagger} className="mt-12 space-y-4">
                  <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground/50 uppercase mb-4">What we look at</motion.p>
                  {whatWeCheck.map(({ icon: Icon, label, desc }) => (
                    <motion.div
                      key={label}
                      variants={fadeUp}
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-9 w-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/20 transition-all duration-300 shrink-0 mt-0.5">
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-foreground/90">{label}</div>
                        <div className="text-[13px] text-muted-foreground mt-0.5">{desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-accent" />
                  </div>
                  <span className="text-[13px] text-muted-foreground">No obligation. We send you findings regardless of whether we work together.</span>
                </motion.div>
              </motion.div>

              {/* Right: form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <AuditForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
