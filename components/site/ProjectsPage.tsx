'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { Navbar } from './Navbar'
import { Section, SectionDivider } from './Section'
import { CTASection } from './CTASection'
import { Footer } from './Footer'

type Market = 'Berkshires' | 'North Shore'

interface Project {
  id: string
  industry: string
  location: string
  result: string
  story: string
  services: string[]
  market: Market
}

const projects: Project[] = [
  {
    id: 'p01',
    industry: 'Home Services',
    location: 'Pittsfield, MA',
    result: '+184% Google reach in 90 days',
    story: 'A painting company with 12 years of word-of-mouth referrals but zero digital presence. We built their GBP from scratch, ran a job-content system, and had them in Google\'s Local Pack within 8 weeks.',
    services: ['GBP', 'Local SEO', 'Content'],
    market: 'Berkshires',
  },
  {
    id: 'p02',
    industry: 'HVAC',
    location: 'Lenox, MA',
    result: '3× more inbound calls — first month',
    story: 'An HVAC outfit serving South County had a decade-old site and zero reviews. New site, a review system, and consistent GBP posts — inbound calls tripled before the second billing cycle.',
    services: ['Web Design', 'Reviews', 'GBP'],
    market: 'Berkshires',
  },
  {
    id: 'p03',
    industry: 'Med Spa',
    location: 'Salem, MA',
    result: '+220% organic bookings in 60 days',
    story: 'A Salem med spa was invisible outside of Instagram. We built context-first local SEO, rewrote their site copy, and wired up a review funnel. Organic appointment bookings more than tripled.',
    services: ['Local SEO', 'Copy', 'Reviews'],
    market: 'North Shore',
  },
  {
    id: 'p04',
    industry: 'Law Firm',
    location: 'Newburyport, MA',
    result: 'Top 3 for 6 local terms in 90 days',
    story: 'A two-attorney estate planning firm competing against larger Boston-adjacent firms. We built domain authority through structured local content and schema — six key terms, top three, 90 days.',
    services: ['SEO', 'Schema', 'Content'],
    market: 'North Shore',
  },
  {
    id: 'p05',
    industry: 'Landscaping',
    location: 'Great Barrington, MA',
    result: 'Booked out 6 weeks ahead entering spring',
    story: 'A Great Barrington landscaper relied entirely on seasonal flyers. We launched a lean digital presence before the spring rush — GBP, before/after job content, simple booking page. Fully booked before April.',
    services: ['GBP', 'Content', 'Web Design'],
    market: 'Berkshires',
  },
  {
    id: 'p06',
    industry: 'Hospitality',
    location: 'Gloucester, MA',
    result: '+41% direct reservations vs prior year',
    story: 'A boutique inn in Gloucester was losing direct bookings to OTA platforms. We improved their Google search presence, ran a review campaign, and added direct-booking CTAs that actually converted.',
    services: ['GBP', 'Local SEO', 'CRO'],
    market: 'North Shore',
  },
]

const FILTERS = ['All', 'Berkshires', 'North Shore'] as const
type Filter = (typeof FILTERS)[number]

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

function ProjectsGrid({ filter }: { filter: Filter }) {
  const visible = filter === 'All' ? projects : projects.filter((p) => p.market === filter)

  return (
    <motion.div
      key={filter}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {visible.map((p) => (
        <motion.article
          key={p.id}
          variants={card}
          whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }}
          className="group glass-card rounded-xl p-6 sm:p-7 hover:border-border-strong hover:shadow-[4px_4px_0px_rgba(0,0,0,0.45),0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden relative cursor-default"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 0%, hsl(var(--accent)/0.06), transparent 70%)' }}
          />

          <div className="flex items-start justify-between gap-3 mb-4 relative">
            <span className="text-[11px] font-medium text-muted-foreground">
              {p.industry} · {p.location}
            </span>
            <span
              className={`text-[10px] font-bold font-mono tracking-[0.14em] px-2 py-0.5 rounded-full border shrink-0 ${
                p.market === 'Berkshires'
                  ? 'border-accent/30 text-accent/70 bg-accent/5'
                  : 'border-border text-muted-foreground/70'
              }`}
            >
              {p.market}
            </span>
          </div>

          <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.03em] leading-tight mb-3 relative">
            {p.result}
          </h3>

          <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed mb-5 relative">
            {p.story}
          </p>

          <div className="flex flex-wrap gap-1.5 relative">
            {p.services.map((s) => (
              <span
                key={s}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-accent/30 group-hover:text-foreground/70 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

export function ProjectsPage() {
  useScrollDepth()
  const [filter, setFilter] = useState<Filter>('All')

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Section
          id="projects"
          eyebrow="Work / 06"
          title={
            <>
              Results from{' '}
              <span className="font-display-italic text-muted-foreground">real businesses</span>{' '}
              across both markets.
            </>
          }
          subtitle="Every number here is from an actual client. No stock results, no inflated averages — just what happened when local businesses got serious about their digital signal."
        >
          <div className="flex gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 border ${
                  filter === f
                    ? 'bg-accent border-accent text-white'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground bg-transparent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <ProjectsGrid filter={filter} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mt-16 text-center text-[14px] text-muted-foreground/60"
          >
            More case studies coming soon — ask us about your industry.
          </motion.p>
        </Section>
        <SectionDivider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
