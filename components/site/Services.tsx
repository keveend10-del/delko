'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'
import { Layers, LayoutGrid, TrendingUp, ArrowUpRight } from 'lucide-react'
import { ArcLight } from './ArcLight'

const services = [
  {
    icon: Layers,
    n: 'S01',
    title: 'Brand & Web',
    short: 'Logo, identity, web design, and development.',
    desc: 'We build the foundation your business stands on — logo, brand identity, web design, and development. A clear brand and a fast, professional website that works on every device and sends people straight to you.',
    tags: ['Brand Identity', 'Web Design', 'Development'],
    featured: true,
    span: 'lg:col-span-2',
  },
  {
    icon: LayoutGrid,
    n: 'S02',
    title: 'Content & Social',
    short: 'Creative direction, social media, and content calendars.',
    desc: "Consistent presence across the platforms your customers actually use. We handle creative direction, social media management, content calendars, and photography/video direction — so your brand shows up and sounds like you.",
    tags: ['Social Media', 'Content', 'Creative'],
    featured: false,
    span: 'lg:col-span-1',
  },
  {
    icon: TrendingUp,
    n: 'S03',
    title: 'Growth & Visibility',
    short: 'Paid ads, SEO, AI search optimization, and email.',
    desc: "Paid ads on Meta and Google, local SEO, AI search optimization (ChatGPT, Perplexity, Google AI), and email — everything that turns your brand into a customer acquisition engine. AI search visibility is included, not an add-on.",
    tags: ['Paid Ads', 'SEO', 'AI Visibility', 'Email'],
    featured: true,
    span: 'lg:col-span-3',
  },
]

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const ServiceCard = ({ s, compact, index }: { s: typeof services[0]; compact: boolean; index: number }) => {
  const { icon: Icon, n, title, short, desc, tags, featured, span } = s
  const isWide = featured && !compact
  const isFullWidth = span === 'lg:col-span-3' && !compact

  return (
    <motion.article
      variants={card}
      whileHover={{ y: isFullWidth ? -1 : isWide ? -2 : -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className={`group glass-card rounded-xl hover:border-border-strong transition-all duration-300 overflow-hidden relative cursor-default ${!compact ? span : ''} ${isWide ? 'hover:shadow-[4px_4px_0px_rgba(0,0,0,0.4),0_20px_56px_rgba(0,0,0,0.5)]' : 'hover:shadow-[4px_4px_0px_rgba(0,0,0,0.45),0_16px_48px_rgba(0,0,0,0.5)]'}`}
      style={{ padding: compact ? '1.5rem' : isFullWidth ? '2.25rem 2.5rem' : isWide ? '2rem 2.25rem' : '1.75rem 2rem' }}
    >
      {isWide && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/50 via-accent/20 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 70% at -5% 50%, hsl(var(--accent)/0.06), transparent 65%)' }} />
        </>
      )}
      {isFullWidth && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 90% at 100% 50%, hsl(var(--accent)/0.07), transparent 60%)' }} />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 40% at 30% 0%, hsl(var(--accent)/0.06), transparent 70%)' }} />
      <ArcLight radius={12} duration={12} delay={index * 1.4} />

      {isFullWidth ? (
        // Full-width card: horizontal split layout
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="flex items-center gap-4 lg:gap-5 shrink-0">
            <div className="h-12 w-12 rounded-xl border border-accent/[0.25] bg-accent/[0.08] flex items-center justify-center text-accent">
              <Icon size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground/40 block mb-1">{n}</span>
              <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.03em] leading-tight">{title}</h3>
            </div>
          </div>
          <div className="hidden lg:block w-px h-16 bg-border/50 shrink-0" />
          <p className="flex-1 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{desc}</p>
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-accent/[0.2] bg-accent/[0.06] text-accent/70 group-hover:border-accent/[0.35] group-hover:text-accent transition-colors">{t}</span>
              ))}
            </div>
            <ArrowUpRight size={15} className="text-accent/25 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      ) : isWide ? (
        // Wide featured card: horizontal icon + content
        <div className="relative flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
          <div className="shrink-0">
            <div className="h-11 w-11 rounded-xl border border-accent/[0.25] bg-accent/[0.08] flex items-center justify-center text-accent">
              <Icon size={19} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.03em] leading-tight">{title}</h3>
              <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground/40 shrink-0 pt-0.5">{n}</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{compact ? short : desc}</p>
            <div className="flex items-center justify-between mt-5 gap-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-accent/[0.2] bg-accent/[0.06] text-accent/70 group-hover:border-accent/[0.35] group-hover:text-accent transition-colors">{t}</span>
                ))}
              </div>
              <ArrowUpRight size={15} className="text-accent/25 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
            </div>
          </div>
        </div>
      ) : (
        // Standard narrow card: vertical
        <div className="relative">
          <div className="flex items-start justify-between mb-5">
            <motion.div
              whileHover={{ rotate: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="h-10 w-10 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-300"
            >
              <Icon size={18} />
            </motion.div>
            <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground/60">{n}</span>
          </div>
          <h3 className="text-[17px] sm:text-[19px] font-bold tracking-[-0.025em] leading-tight">{title}</h3>
          <p className={`text-muted-foreground leading-relaxed ${compact ? 'mt-2 text-[13px] leading-snug' : 'mt-3 text-[14px]'}`}>
            {compact ? short : desc}
          </p>
          <div className={`flex items-center justify-between ${compact ? 'mt-4' : 'mt-6'}`}>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-accent/30 group-hover:text-foreground/70 transition-colors">{t}</span>
              ))}
            </div>
            {!compact && <ArrowUpRight size={15} className="text-muted-foreground/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />}
          </div>
        </div>
      )}
    </motion.article>
  )
}

export const Services = ({ compact = false }: { compact?: boolean }) => (
  <Section
    id="services"
    eyebrow="What We Do / 03"
    title={<>Three pillars. <span className="font-display-italic text-muted-foreground">One roof.</span></>}
    subtitle={compact ? undefined : 'Brand, web, social, and growth — under one roof, with two people who actually know your market.'}
    align="center"
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={`grid gap-4 sm:gap-5 ${compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-3'}`}
    >
      {services.map((s, i) => (
        <ServiceCard key={s.n} s={s} compact={compact} index={i} />
      ))}
    </motion.div>

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
