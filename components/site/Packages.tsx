'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Section } from './Section'
import { Button } from '@/components/ui/Button'
import { Check, ArrowUpRight, Minus } from 'lucide-react'
import { ArcLight } from './ArcLight'

const packages = [
  {
    key: 'foundation',
    name: 'Starter Presence',
    tagline: 'Fix the foundation. Get found first.',
    price: '2,000',
    priceSuffix: '/mo',
    cta: 'Get Started',
    popular: false,
    features: [
      'Google Business Profile cleanup',
      'Website audit and basic fixes',
      'Review request system',
      'Missed-call text-back',
      'Lead capture form',
      'Simple lead tracking',
      'Monthly report',
    ],
  },
  {
    key: 'growth',
    name: 'Local Growth System',
    tagline: 'More calls, AI-ready, consistent growth.',
    price: '2,500',
    priceSuffix: '/mo',
    cta: 'Build Your System',
    popular: true,
    features: [
      'Everything in Starter Presence, plus:',
      'Landing page or website refresh',
      'Local SEO + GEO/AEO optimization',
      'Review generation system',
      'AI-drafted social content',
      'Email / SMS follow-up',
      'Monthly strategy call',
      'AI search visibility (ChatGPT, Google AI)',
    ],
  },
  {
    key: 'dominate',
    name: 'Growth Partner',
    tagline: 'Own your market. Full system, fully managed.',
    price: '4,500',
    priceSuffix: '/mo',
    cta: 'Become a Partner',
    popular: false,
    features: [
      'Everything in Local Growth System, plus:',
      'Paid ads setup and management',
      'CRM setup and management',
      'Full agentic AI workflow suite',
      'Customer reactivation campaigns',
      'Reputation management',
      'Seasonal campaign packages',
      'Reporting dashboard',
      'Biweekly strategy calls',
    ],
  },
]

const oneTimePackages = [
  {
    name: 'Website Sprint',
    tagline: 'A better online foundation, fast.',
    price: 'from $1,500',
    priceSuffix: 'one-time · no ongoing commitment',
    cta: 'Get a Quote',
    features: [
      'Website build or refresh',
      'Mobile optimization',
      'Contact / quote form',
      'Service pages',
      'Basic SEO setup',
      'FAQ section',
      'Google Business Profile review',
      '30 days of support',
    ],
    addon: 'Optional: Ongoing management at $250–$500/mo',
  },
  {
    name: 'Seasonal Campaign',
    tagline: 'A targeted push for summer, fall, holidays, or a slow season.',
    price: 'from $1,000',
    priceSuffix: 'one-time · no ongoing commitment',
    cta: 'Get a Quote',
    features: [
      'Campaign strategy',
      'Landing page',
      'Social content calendar',
      'Google Business Profile posts',
      'Email / SMS copy',
      'Offer positioning',
      'AI visibility / FAQ content',
    ],
    addon: null,
  },
]

const OneTimeCard = ({ p, index }: { p: typeof oneTimePackages[0]; index: number }) => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="glass-card rounded-xl p-8 flex flex-col hover:border-border-strong hover:shadow-[4px_4px_0px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
    >
      <ArcLight radius={12} duration={12} delay={index * 1.8} />
      <div className="text-[11px] font-bold font-mono tracking-[0.18em] uppercase text-muted-foreground relative">{p.name}</div>
      <div className="mt-1.5 text-[14px] font-display-italic text-muted-foreground relative">{p.tagline}</div>
      <div className="mt-6 relative">
        <span className="text-[34px] sm:text-[40px] font-bold tracking-[-0.04em] leading-none">{p.price}</span>
      </div>
      <div className="text-[11px] mt-1.5 font-medium text-muted-foreground relative">{p.priceSuffix}</div>
      <div className="my-6 h-px bg-border" />
      <ul className="space-y-3 flex-1 relative">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px]">
            <Check size={14} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-foreground/75">{f}</span>
          </li>
        ))}
      </ul>
      {p.addon && (
        <p className="mt-4 text-[12px] text-muted-foreground/55 leading-relaxed relative italic">{p.addon}</p>
      )}
      <Button
        variant="outline"
        size="lg"
        className="mt-7 w-full"
        onClick={() => router.push('/audit')}
      >
        {p.cta} <ArrowUpRight size={15} />
      </Button>
    </motion.div>
  )
}

const PackageCard = ({ p, index }: { p: typeof packages[0]; index: number }) => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: p.popular ? 0 : -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 ${p.popular ? 'bg-foreground text-background lg:-translate-y-5 shadow-elevated' : 'glass-card hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_20px_60px_rgba(0,0,0,0.4)]'}`}
    >
      <ArcLight radius={12} duration={12} delay={index * 1.5} />
      {p.popular && (
        <div className="absolute -top-3.5 left-7 z-10 inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-[0_0_0_1px_hsl(152_80%_38%/0.6),0_4px_24px_hsl(152_80%_38%/0.35)]">
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
      <div className={`text-[11px] mt-1.5 font-medium ${p.popular ? 'text-background/40' : 'text-muted-foreground'}`}>Starting at · No setup fees</div>

      <div className={`my-8 h-px ${p.popular ? 'bg-background/12' : 'bg-border'}`} />

      <ul className="space-y-3.5 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14px]">
            <Check size={15} className={`mt-0.5 shrink-0 ${p.popular ? 'text-background/60' : 'text-accent'}`} />
            <span className={p.popular ? 'text-background/80' : 'text-foreground/80'}>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={p.popular ? 'accent' : 'outline'}
        size="lg"
        className="mt-9 w-full"
        onClick={() => router.push(`/checkout?plan=${p.key}`)}
      >
        {p.cta} <ArrowUpRight size={15} />
      </Button>
    </motion.div>
  )
}

type FeatureRow = { label: string; starter: boolean; growth: boolean; partner: boolean }
type FeatureGroup = { group: string; rows: FeatureRow[] }

const featureGroups: FeatureGroup[] = [
  {
    group: 'Core Setup',
    rows: [
      { label: 'Google Business Profile cleanup', starter: true, growth: true, partner: true },
      { label: 'Website audit & basic fixes', starter: true, growth: true, partner: true },
      { label: 'Lead capture form', starter: true, growth: true, partner: true },
      { label: 'Review request system', starter: true, growth: true, partner: true },
      { label: 'Simple lead tracking', starter: true, growth: true, partner: true },
      { label: 'Monthly report', starter: true, growth: true, partner: true },
    ],
  },
  {
    group: 'Google + AI Search Visibility',
    rows: [
      { label: 'Landing page or website refresh', starter: false, growth: true, partner: true },
      { label: 'Local SEO + GEO/AEO optimization', starter: false, growth: true, partner: true },
      { label: 'Review generation system', starter: false, growth: true, partner: true },
      { label: 'Email & SMS follow-up', starter: false, growth: true, partner: true },
      { label: 'Monthly strategy call', starter: false, growth: true, partner: true },
      { label: 'AI search visibility (ChatGPT, Google AI)', starter: false, growth: true, partner: true },
    ],
  },
  {
    group: 'AI Workflows',
    rows: [
      { label: 'Missed-call text-back', starter: true, growth: true, partner: true },
      { label: 'AI-drafted social content', starter: false, growth: true, partner: true },
      { label: 'Lead intake automation', starter: false, growth: true, partner: true },
      { label: 'Seasonal campaign generation', starter: false, growth: false, partner: true },
      { label: 'Full agentic AI workflow suite', starter: false, growth: false, partner: true },
    ],
  },
  {
    group: 'Full Acquisition System',
    rows: [
      { label: 'Paid ads setup & management', starter: false, growth: false, partner: true },
      { label: 'CRM setup & management', starter: false, growth: false, partner: true },
      { label: 'Customer reactivation campaigns', starter: false, growth: false, partner: true },
      { label: 'Reputation management', starter: false, growth: false, partner: true },
      { label: 'Reporting dashboard', starter: false, growth: false, partner: true },
      { label: 'Biweekly strategy calls', starter: false, growth: false, partner: true },
    ],
  },
]

const Cell = ({ included, isPopular }: { included: boolean; isPopular?: boolean }) => (
  <td className="text-center py-3.5 px-4">
    {included ? (
      <Check size={16} className={`mx-auto ${isPopular ? 'text-accent' : 'text-accent'}`} />
    ) : (
      <Minus size={14} className="mx-auto text-muted-foreground/30" />
    )}
  </td>
)

const ComparisonTable = () => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="mt-16 w-full overflow-x-auto rounded-xl border border-border"
    >
      <table className="w-full min-w-[620px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-5 px-6 text-[12px] font-semibold text-muted-foreground uppercase tracking-[0.12em] w-[40%]">
              All features
            </th>
            {[
              { name: 'Starter Presence', price: '$2,000/mo', key: 'foundation', popular: false },
              { name: 'Local Growth', price: '$2,500/mo', key: 'growth', popular: true },
              { name: 'Growth Partner', price: '$4,500/mo', key: 'dominate', popular: false },
            ].map((col) => (
              <th
                key={col.key}
                className={`text-center py-5 px-4 w-[20%] ${col.popular ? 'bg-accent/[0.06]' : ''}`}
              >
                <div className={`text-[11px] font-bold uppercase tracking-[0.14em] ${col.popular ? 'text-accent' : 'text-foreground/60'}`}>
                  {col.name}
                </div>
                <div className={`text-[13px] font-semibold mt-1 ${col.popular ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {col.price}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureGroups.map((group) => (
            <React.Fragment key={group.group}>
              <tr className="border-b border-border/50 bg-white/[0.015]">
                <td colSpan={4} className="py-2.5 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">
                  {group.group}
                </td>
              </tr>
              {group.rows.map((row, ri) => (
                <tr
                  key={row.label}
                  className={`border-b border-border/40 transition-colors hover:bg-white/[0.025] ${ri === group.rows.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="py-3.5 px-6 text-[13px] text-foreground/75">{row.label}</td>
                  <Cell included={row.starter} />
                  <Cell included={row.growth} isPopular />
                  <Cell included={row.partner} />
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-border bg-white/[0.02]">
            <td className="py-5 px-6" />
            {[
              { key: 'foundation', label: 'Get Started', popular: false },
              { key: 'growth', label: 'Build Your System', popular: true },
              { key: 'dominate', label: 'Become a Partner', popular: false },
            ].map((col) => (
              <td key={col.key} className={`text-center py-5 px-4 ${col.popular ? 'bg-accent/[0.06]' : ''}`}>
                <Button
                  variant={col.popular ? 'accent' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/checkout?plan=${col.key}`)}
                >
                  {col.label}
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </motion.div>
  )
}

export const Packages = () => {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <Section
      id="packages"
      eyebrow="Packages"
      title={<>Pick the plan that <span className="font-display-italic text-muted-foreground">fits your business.</span></>}
      subtitle="Three monthly plans covering all four pillars: website, AI search visibility, social, and agentic workflows. No setup fees, no long contracts."
      className="!pb-12 sm:!pb-16"
    >
      {/* Mobile: snap carousel */}
      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto pt-5 pb-6 snap-x snap-mandatory -mx-5 px-5 [&::-webkit-scrollbar]:hidden">
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

      <ComparisonTable />

      {/* One-time projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border" />
          <div className="text-[10px] font-bold font-mono uppercase tracking-[0.22em] text-muted-foreground/60 px-2 whitespace-nowrap">Or start with a one-time project</div>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {oneTimePackages.map((p, i) => (
            <OneTimeCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </motion.div>

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
