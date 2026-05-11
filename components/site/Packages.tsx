'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { Button } from '@/components/ui/Button'
import { Check, ArrowUpRight } from 'lucide-react'

const packages = [
  { name: 'Starter', tagline: 'Get found locally.', price: '1,500', priceSuffix: '/mo', priceNote: 'Starting at', cta: 'Get Started', popular: false, features: ['Google Business Profile optimization', 'Local SEO (title tags + local content)', 'Review generation system', 'Monthly performance report'] },
  { name: 'Growth', tagline: 'Generate consistent leads.', price: '2,500', priceSuffix: '/mo', priceNote: 'Starting at', cta: 'Get Started', popular: true, features: ['Everything in Starter, plus:', 'Google Local Services Ads (setup + management)', 'Google Search Ads management', 'Lead follow-up email sequence + CRM setup', 'Bi-weekly strategy calls'] },
  { name: 'Full Stack', tagline: 'Own your market.', price: '4,500', priceSuffix: '/mo', priceNote: 'Starting at', cta: 'Get Started', popular: false, features: ['Everything in Growth, plus:', 'Meta Ads (Facebook + Instagram)', 'Monthly landing page builds', '2 blog posts per month', 'Weekly calls + full reporting', 'Dedicated account manager'] },
]

const PackageCard = ({ p, index }: { p: typeof packages[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    whileHover={{ y: p.popular ? 0 : -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
    className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${p.popular ? 'bg-foreground text-background lg:-translate-y-5 shadow-elevated' : 'glass-card hover:border-border-strong hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]'}`}
  >
    {p.popular && (
      <div className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-glow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground" />
        Most Popular
      </div>
    )}

    <div className={`text-[11px] font-bold font-mono tracking-[0.18em] uppercase ${p.popular ? 'text-background/50' : 'text-muted-foreground'}`}>{p.name}</div>
    <div className={`mt-1.5 text-[15px] font-display-italic ${p.popular ? 'text-background/70' : 'text-muted-foreground'}`}>{p.tagline}</div>

    <div className="mt-8 flex items-baseline gap-1">
      <span className={`text-[13px] font-semibold ${p.popular ? 'text-background/50' : 'text-muted-foreground'}`}>$</span>
      <span className="text-[52px] sm:text-[60px] font-bold tracking-[-0.04em] leading-none">{p.price}</span>
      <span className={`text-[14px] font-medium ${p.popular ? 'text-background/50' : 'text-muted-foreground'}`}>{p.priceSuffix}</span>
    </div>
    <div className={`text-[11px] mt-1.5 font-medium ${p.popular ? 'text-background/40' : 'text-muted-foreground'}`}>{p.priceNote}</div>

    <div className={`my-8 h-px ${p.popular ? 'bg-background/12' : 'bg-border'}`} />

    <ul className="space-y-3.5 flex-1">
      {p.features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-[14px]">
          <Check size={15} className={`mt-0.5 shrink-0 ${p.popular ? 'text-background/60' : 'text-accent'}`} />
          <span className={p.popular ? 'text-background/80' : 'text-foreground/80'}>{f}</span>
        </li>
      ))}
    </ul>

    <Button asChild variant={p.popular ? 'accent' : 'outline'} size="lg" className="mt-9 w-full">
      <a href="#audit">{p.cta} <ArrowUpRight /></a>
    </Button>
  </motion.div>
)

export const Packages = () => {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <Section
      id="packages"
      eyebrow="Packages / 03"
      title={<>Pick the plan that <span className="font-display-italic text-muted-foreground">fits your business.</span></>}
      subtitle="Three plans, no long contracts, no setup fees. Cancel month-to-month if it isn't working — but it will."
    >
      {/* Mobile: snap carousel */}
      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory -mx-5 px-5 [&::-webkit-scrollbar]:hidden">
          {packages.map((p, i) => (
            <div
              key={p.name}
              className="snap-center shrink-0 w-[82vw] max-w-sm"
              onPointerEnter={() => setActiveIndex(i)}
            >
              <PackageCard p={p} index={i} />
            </div>
          ))}
        </div>
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-2">
          {packages.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border'}`} />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5">
        {packages.map((p, i) => (
          <PackageCard key={p.name} p={p} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10 text-center text-[13px] text-muted-foreground"
      >
        Ad spend is paid directly to Google/Meta by you. No markups, no surprises.
      </motion.p>
    </Section>
  )
}
