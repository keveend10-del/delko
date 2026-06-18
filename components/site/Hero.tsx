'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, Layers, LayoutGrid, TrendingUp, Bot } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

const headlineLine = {
  hidden: { opacity: 0, y: 52, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const pillars = [
  {
    icon: Layers,
    n: '01',
    title: 'Brand & Web',
    desc: 'Logo, identity, and a site that converts.',
    color: 'hsl(217 91% 60%)',
    delay: 0,
  },
  {
    icon: LayoutGrid,
    n: '02',
    title: 'Content & Social',
    desc: 'Consistent presence on the platforms that matter.',
    color: 'hsl(260 80% 65%)',
    delay: 0.08,
  },
  {
    icon: TrendingUp,
    n: '03',
    title: 'Google + AI Visibility',
    desc: 'Local SEO, GBP, paid ads, and AI search.',
    color: 'hsl(145 60% 50%)',
    delay: 0.16,
  },
  {
    icon: Bot,
    n: '04',
    title: 'AI Workflows',
    desc: 'Automated follow-up, reviews, and reporting.',
    color: 'hsl(35 90% 58%)',
    delay: 0.24,
  },
]

const floatVariants = [
  { y: [0, -10, 0], duration: 5.2 },
  { y: [0, 8, 0], duration: 6.1 },
  { y: [0, -7, 0], duration: 4.8 },
  { y: [0, 9, 0], duration: 5.7 },
]

export const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full animate-glow"
          style={{
            y: glowY,
            width: '100%',
            height: '800px',
            top: '-200px',
            left: '0',
            background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--accent) / 0.18) 0%, hsl(217 91% 60% / 0.06) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 10%, black, transparent 80%)',
        }}
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-10"
          >
            <div className="glass rounded-full px-4 py-1.5 flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-accent animate-dot" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Berkshire County & North Shore MA
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={headlineContainer} initial="hidden" animate="show" className="mb-8">
            <motion.h1
              variants={headlineLine}
              className="text-[72px] sm:text-[100px] lg:text-[128px] font-bold leading-[0.9] tracking-[-0.055em] text-gradient-headline"
            >
              Grow your
            </motion.h1>
            <motion.h1
              variants={headlineLine}
              className="text-[72px] sm:text-[100px] lg:text-[128px] font-display-italic leading-[0.9] text-muted-foreground/60"
            >
              local business.
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[17px] sm:text-[19px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto mb-10"
          >
            Brand, web, social, and AI visibility — four pillars, one team, no account managers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-20"
          >
            <Button asChild variant="accent" size="xl">
              <a href="/audit" onClick={() => trackCTAClick('get_visibility_audit', 'hero')}>
                Get a Free Visibility Audit <ArrowUpRight size={16} />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="/pricing" onClick={() => trackCTAClick('view_packages', 'hero')}>View Packages</a>
            </Button>
          </motion.div>

          {/* Four Pillar Visual */}
          <FourPillars />
        </div>
      </motion.div>
    </section>
  )
}

const FourPillars = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.85, duration: 0.8 }}
    className="relative"
  >
    {/* Center connector lines (SVG) */}
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Horizontal center line */}
        <line x1="12.5%" y1="50%" x2="87.5%" y2="50%" stroke="hsl(var(--accent) / 0.12)" strokeWidth="1" strokeDasharray="4 6" />
        {/* Center dot */}
        <circle cx="50%" cy="50%" r="4" fill="hsl(var(--accent) / 0.3)" />
        <circle cx="50%" cy="50%" r="8" fill="none" stroke="hsl(var(--accent) / 0.12)" strokeWidth="1" />
      </svg>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {pillars.map((p, i) => {
        const Icon = p.icon
        const float = floatVariants[i]
        return (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.9 + p.delay,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            <motion.div
              animate={{ y: float.y }}
              transition={{ duration: float.duration, repeat: Infinity, ease: 'easeInOut' }}
              className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 text-left hover:border-accent/30 transition-colors duration-300"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${p.color}12, transparent 70%)` }}
              />

              <div className="relative">
                {/* Number */}
                <div className="text-[10px] font-mono text-muted-foreground/40 mb-3 tracking-widest">{p.n}</div>

                {/* Icon */}
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}18`, boxShadow: `0 0 0 1px ${p.color}25` }}
                >
                  <Icon size={16} style={{ color: p.color }} />
                </div>

                {/* Text */}
                <div className="text-[14px] font-bold text-foreground leading-tight mb-1.5">{p.title}</div>
                <div className="text-[12px] text-muted-foreground leading-snug">{p.desc}</div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  </motion.div>
)
