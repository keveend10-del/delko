'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Zap, BarChart2, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackCTAClick } from '@/lib/analytics'

const steps = [
  { icon: Target, label: 'Audit', desc: 'We map your gaps — website, Google, reviews, competitors.' },
  { icon: BarChart2, label: 'Build', desc: 'Custom plan: channels, messaging, and budget for your market.' },
  { icon: Zap, label: 'Run it', desc: 'We execute the campaign and report results every 30 days.' },
]

export function CampaignSection() {
  return (
    <section className="relative py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--accent)/0.08), transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="eyebrow mb-6 justify-center flex">Custom Campaigns</div>
            <h2 className="text-[40px] sm:text-[58px] lg:text-[70px] font-bold leading-[1.0] tracking-[-0.04em] mb-6">
              Not sure where to start?{' '}
              <span className="font-display-italic text-muted-foreground">We'll build the plan.</span>
            </h2>
            <p className="text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              No templates, no guessing. We audit your digital presence, map your local competition, and put together a full marketing campaign specific to your business — then run it.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {steps.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
                className="group glass-card rounded-xl p-6 text-center hover:border-accent/30 transition-colors duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, hsl(var(--accent)/0.07), transparent 70%)' }}
                />
                <div className="text-[10px] font-mono text-muted-foreground/40 tracking-widest mb-3 relative">
                  0{i + 1}
                </div>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-4 relative" style={{ background: 'hsl(var(--accent)/0.12)', boxShadow: '0 0 0 1px hsl(var(--accent)/0.2)' }}>
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="text-[15px] font-bold mb-2 relative">{label}</div>
                <div className="text-[13px] text-muted-foreground leading-snug relative">{desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Button asChild variant="accent" size="xl">
              <a href="/audit" onClick={() => trackCTAClick('campaign_cta', 'campaign_section')}>
                Get a Free Strategy Session <ArrowUpRight size={16} />
              </a>
            </Button>
            <p className="mt-4 text-[12px] text-muted-foreground/50">No commitment. We show you what we'd do, you decide if it makes sense.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
