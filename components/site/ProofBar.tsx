'use client'

import { motion } from 'framer-motion'

export const ProofBar = () => (
  <div className="border-y border-border/40 bg-surface/30 backdrop-blur-sm">
    <div className="container mx-auto px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="py-6 sm:py-8 text-center"
      >
        <div className="text-[13px] sm:text-[14px] font-semibold text-foreground/60 tracking-wide">
          Case studies and first client results — coming soon
        </div>
        <div className="text-[11px] text-muted-foreground/40 mt-1.5">
          We&rsquo;re onboarding our first clients now. Real numbers on the way.
        </div>
      </motion.div>
    </div>
  </div>
)
