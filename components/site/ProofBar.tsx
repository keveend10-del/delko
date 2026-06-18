'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const proofs = [
  {
    stat: '+184%',
    label: 'Google reach',
    context: 'Painting co · Berkshires · 90 days',
  },
  {
    stat: '3×',
    label: 'more inbound calls',
    context: 'HVAC · South County · first month',
  },
  {
    stat: '+220%',
    label: 'organic bookings',
    context: 'Med spa · Salem · 60 days',
  },
]

export const ProofBar = () => (
  <div className="border-y border-border/40 bg-surface/30 backdrop-blur-sm">
    <div className="container mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-3 divide-x divide-border/40"
      >
        {proofs.map(({ stat, label, context }) => (
          <div key={stat} className="py-6 sm:py-8 px-4 sm:px-10 text-center">
            <div className="text-[26px] sm:text-[34px] font-bold tracking-[-0.04em] text-foreground">{stat}</div>
            <div className="text-[12px] sm:text-[14px] font-semibold text-foreground/75 mt-0.5">{label}</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground/60 mt-1 leading-snug">{context}</div>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center pb-4"
      >
        <a
          href="/projects"
          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
        >
          View all results <ArrowUpRight size={10} />
        </a>
      </motion.div>
    </div>
  </div>
)
