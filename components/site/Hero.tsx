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
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
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
  },
  {
    icon: LayoutGrid,
    n: '02',
    title: 'Content & Social',
    desc: 'Consistent presence on the platforms that matter.',
    color: 'hsl(260 80% 65%)',
  },
  {
    icon: TrendingUp,
    n: '03',
    title: 'Google + AI Visibility',
    desc: 'Local SEO, GBP, paid ads, and AI search.',
    color: 'hsl(145 60% 50%)',
  },
  {
    icon: Bot,
    n: '04',
    title: 'AI Workflows',
    desc: 'Automated follow-up, reviews, and reporting.',
    color: 'hsl(35 90% 58%)',
  },
]

// Each star: top%, left%, duration(s), delay(s), angle(deg), peak opacity
const stars = [
  { top: '-2%',  left: '8%',  dur: 6.2, delay: 0,     angle: 16, peak: 0.14 },
  { top: '12%',  left: '0%',  dur: 8.1, delay: -3.5,  angle: 20, peak: 0.10 },
  { top: '-5%',  left: '28%', dur: 5.4, delay: -7,    angle: 14, peak: 0.18 },
  { top: '22%',  left: '5%',  dur: 7.3, delay: -1.8,  angle: 22, peak: 0.08 },
  { top: '-3%',  left: '52%', dur: 9.0, delay: -5,    angle: 12, peak: 0.12 },
  { top: '5%',   left: '38%', dur: 6.8, delay: -10,   angle: 18, peak: 0.16 },
  { top: '30%',  left: '15%', dur: 5.9, delay: -2,    angle: 24, peak: 0.07 },
  { top: '-1%',  left: '70%', dur: 7.6, delay: -8,    angle: 15, peak: 0.10 },
]

export const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex flex-col pt-20 pb-10">
      {/* Background layer — overflow-hidden scoped here so headline isn't clipped */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial glow */}
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

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 10%, black, transparent 80%)',
          }}
        />

        {/* Shooting stars */}
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: s.top,
              left: s.left,
              animationName: 'shoot-star',
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
              '--star-angle': `${s.angle}deg`,
              '--star-peak': s.peak,
            } as React.CSSProperties}
          >
            {/* Trail */}
            <div
              style={{
                width: '140px',
                height: '1px',
                background: 'linear-gradient(to right, transparent 0%, hsl(var(--accent) / 0.15) 30%, hsl(var(--accent) / 0.6) 72%, white 100%)',
                borderRadius: '9999px',
                filter: 'blur(0.8px)',
              }}
            />
            {/* Head dot */}
            <div
              style={{
                position: 'absolute',
                right: '-2px',
                top: '-2px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 0 6px 2px hsl(var(--accent) / 0.7), 0 0 12px 4px hsl(var(--accent) / 0.3)',
                filter: 'blur(0.3px)',
              }}
            />
          </div>
        ))}
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <img src="/favicon.svg" alt="Delko" className="h-12 w-12" />
            <div className="h-8 w-px bg-border" />
            <span className="text-[20px] font-bold tracking-[-0.03em] text-foreground/75">Delko</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-6"
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

          {/* Headline — overflow-visible so blur animation isn't clipped */}
          <motion.div
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="mb-5 overflow-visible"
          >
            <motion.h1
              variants={headlineLine}
              className="text-[72px] sm:text-[100px] lg:text-[128px] font-bold leading-[0.9] tracking-[-0.055em] text-foreground overflow-visible"
            >
              Grow your
            </motion.h1>
            <motion.h1
              variants={headlineLine}
              className="text-[72px] sm:text-[100px] lg:text-[128px] font-display-italic leading-[0.9] text-muted-foreground/60 overflow-visible"
            >
              local business.
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[17px] sm:text-[19px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto mb-6"
          >
            Brand, web, social, and AI visibility — four pillars, one team, no account managers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
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

          {/* Four Pillars */}
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
    {/* Dashed connector line on desktop */}
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="12.5%" y1="50%" x2="87.5%" y2="50%" stroke="hsl(var(--accent) / 0.12)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="50%" cy="50%" r="4" fill="hsl(var(--accent) / 0.3)" />
        <circle cx="50%" cy="50%" r="8" fill="none" stroke="hsl(var(--accent) / 0.12)" strokeWidth="1" />
      </svg>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {pillars.map((p, i) => {
        const Icon = p.icon
        return (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.9 + i * 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 text-left hover:border-accent/30 transition-colors duration-300"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 30% 30%, ${p.color}12, transparent 70%)` }}
            />

            <div className="relative">
              <div className="text-[10px] font-mono text-muted-foreground/40 mb-3 tracking-widest">{p.n}</div>
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${p.color}18`, boxShadow: `0 0 0 1px ${p.color}25` }}
              >
                <Icon size={16} style={{ color: p.color }} />
              </div>
              <div className="text-[14px] font-bold text-foreground leading-tight mb-1.5">{p.title}</div>
              <div className="text-[12px] text-muted-foreground leading-snug">{p.desc}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  </motion.div>
)
