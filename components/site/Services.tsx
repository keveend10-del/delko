'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from './Section'
import { Monitor, Share2, MapPin, Search, Camera, TrendingUp, ArrowUpRight, ChevronDown } from 'lucide-react'

const services = [
  { icon: Monitor, n: 'S01', title: 'A site that builds trust signals', short: 'Fast, clear, and built to make people call.', desc: 'Fast, mobile-first, clearly written — so when Google evaluates your business for a searcher\'s profile, it sees a real, credible operation. And when the person lands, they call.', tags: ['Design', 'Build', 'Copy'] },
  { icon: Share2, n: 'S02', title: 'Social presence that feeds the algorithm', short: 'Active profiles signal legitimacy to Google.', desc: "Active social pages aren't just for followers — they're behavioral signals Google reads to establish you as a legitimate local business. We keep them alive and consistent.", tags: ['Bios', 'Templates', 'Voice'] },
  { icon: MapPin, n: 'S03', title: 'Google Business Profile', short: 'The richest context signal you can control.', desc: "Your GBP is the single richest context signal you can send Google. Real photos, accurate service areas, weekly posts, and a review system — all telling Google exactly who you serve.", tags: ['GBP', 'Reviews', 'Posts'] },
  { icon: Search, n: 'S04', title: 'Context-first local SEO', short: 'Built to match how your customers actually search.', desc: "We don't chase keyword positions. We build the architecture that tells Google you're the right contextual match — so you show up when the person searching is actually your customer.", tags: ['Context', 'Local', 'Schema'] },
  { icon: Camera, n: 'S05', title: 'Content from your real jobs', short: 'Real photos and videos that build buyer trust.', desc: 'Before/after photos, short videos, simple captions from real work — they strengthen the behavioral signals Google uses to decide who\'s relevant, and they build trust with the humans too.', tags: ['Photo', 'Video', 'Calendar'] },
  { icon: TrendingUp, n: 'S06', title: 'Monthly signal maintenance', short: 'Everything stays active — posts, reviews, reporting.', desc: "Context signals decay if you stop feeding them. We keep everything active — posts, ads, reviews, site updates — and send you a plain-English report on what's working.", tags: ['Retainer', 'Reporting', 'Edits'] },
]

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const ServiceCard = ({ s, compact }: { s: typeof services[0]; compact: boolean }) => {
  const { icon: Icon, n, title, short, desc, tags } = s
  return (
    <motion.article
      variants={card}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="group glass-card rounded-xl hover:border-border-strong hover:shadow-[4px_4px_0px_rgba(0,0,0,0.45),0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden relative cursor-default"
      style={{ padding: compact ? '1.5rem' : '1.75rem 2.25rem' }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 0%, hsl(var(--accent)/0.06), transparent 70%)' }} />
      <div className="flex items-start justify-between mb-5 relative">
        <motion.div
          whileHover={{ rotate: -5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="h-10 w-10 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-300"
        >
          <Icon size={18} />
        </motion.div>
        <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground/60">{n}</span>
      </div>
      <h3 className="text-[17px] sm:text-[19px] font-bold tracking-[-0.025em] leading-tight relative">{title}</h3>
      {compact
        ? <p className="mt-2 text-[13px] text-muted-foreground leading-snug relative">{short}</p>
        : <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed relative">{desc}</p>
      }
      <div className={`flex items-center justify-between relative ${compact ? 'mt-4' : 'mt-6'}`}>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-accent/30 group-hover:text-foreground/70 transition-colors">{t}</span>
          ))}
        </div>
        {!compact && <ArrowUpRight size={15} className="text-muted-foreground/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />}
      </div>
    </motion.article>
  )
}

export const Services = ({ compact = false }: { compact?: boolean }) => {
  const [expanded, setExpanded] = useState(false)
  const visible = compact && !expanded ? services.slice(0, 3) : services

  return (
    <Section
      id="services"
      eyebrow="Services / 06"
      title={compact
        ? <>Built for <span className="font-display-italic text-muted-foreground">how Google works now.</span></>
        : <>Six services. <span className="font-display-italic text-muted-foreground">One goal.</span></>
      }
      subtitle={compact ? undefined : 'Every service builds the context signals Google uses to route real customers to your business — not keyword lists.'}
      align="center"
    >
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className={`grid gap-4 sm:gap-5 ${compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}
      >
        {visible.map((s) => (
          <ServiceCard key={s.n} s={s} compact={compact} />
        ))}

        {compact && !expanded && (
          <AnimatePresence>
            <motion.button
              key="expand"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setExpanded(true)}
              className="group glass-card rounded-xl border-dashed hover:border-border-strong transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 py-8"
              style={{ padding: '1.5rem' }}
            >
              <div className="h-10 w-10 rounded-xl border border-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-300">
                <ChevronDown size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <span className="text-[13px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">See all 6 services</span>
            </motion.button>
          </AnimatePresence>
        )}
      </motion.div>

      {compact && expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.slice(3).map((s) => (
            <ServiceCard key={s.n} s={s} compact={compact} />
          ))}
        </motion.div>
      )}

      {compact && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <a href="/services" className="text-[13px] text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5">
            Full breakdown on the services page <ArrowUpRight size={13} />
          </a>
        </motion.div>
      )}
    </Section>
  )
}
