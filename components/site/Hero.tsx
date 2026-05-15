'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, Star, Phone, Check, TrendingUp, MapPin, Search, Navigation } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
}

const headlineLine = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const stats = [
  { value: '06', label: 'Core Services' },
  { value: '2', label: 'Markets' },
  { value: '$0', label: 'Setup Fees' },
  { value: 'M–M', label: 'Contracts' },
]

export const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -140])
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
  <section ref={ref} id="top" className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y: blob1Y, width: 700, height: 700, top: '5%', left: '38%', background: 'hsl(var(--accent) / 0.11)', filter: 'blur(130px)' }} className="absolute rounded-full animate-glow" />
      <motion.div style={{ y: blob2Y, width: 450, height: 450, bottom: '10%', right: '5%', background: 'hsl(260 60% 60% / 0.09)', filter: 'blur(100px)' }} className="absolute rounded-full animate-glow" />
      <motion.div style={{ y: blob3Y, width: 300, height: 300, top: '55%', left: '8%', background: 'hsl(var(--accent) / 0.05)', filter: 'blur(80px)' }} className="absolute rounded-full" />
    </div>

    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent 80%)',
      }}
    />

    <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container mx-auto px-5 sm:px-8 relative z-10">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-dot" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">
              Berkshires & North Shore, MA
            </span>
          </motion.div>

          <motion.div variants={headlineContainer} initial="hidden" animate="show">
            <motion.div variants={headlineLine}>
              <h1 className="text-[64px] sm:text-[86px] lg:text-[108px] font-bold leading-[0.93] tracking-[-0.05em]">More calls.</h1>
            </motion.div>
            <motion.div variants={headlineLine}>
              <h1 className="text-[64px] sm:text-[86px] lg:text-[108px] font-display-italic leading-[0.93] text-muted-foreground">More jobs.</h1>
            </motion.div>
            <motion.div variants={headlineLine}>
              <h1 className="text-[64px] sm:text-[86px] lg:text-[108px] font-bold leading-[0.93] tracking-[-0.05em]">More revenue.</h1>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mt-9 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-[500px]"
          >
            We build the signals Google uses to route real customers to your business. Not keywords — context.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Button asChild variant="accent" size="xl">
              <a href="#audit" onClick={() => trackCTAClick('get_free_audit', 'hero')}>Get a Free Audit <ArrowUpRight size={16} /></a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="/services" onClick={() => trackCTAClick('see_services', 'hero')}>See Our Services</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {[
                { initials: 'MR', cls: 'bg-accent/20 text-accent' },
                { initials: 'JT', cls: 'bg-white/10 text-white/55' },
                { initials: 'KD', cls: 'bg-accent/12 text-accent/70' },
              ].map(({ initials, cls }) => (
                <div key={initials} className={`h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold ${cls}`}>
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-[13px] text-muted-foreground">
              Serving <span className="text-foreground font-medium">Pittsfield, Lenox, Salem</span> and beyond
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="mt-24 max-w-7xl mx-auto"
      >
        <div className="hairline mb-12" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-[44px] sm:text-[52px] font-bold tracking-[-0.05em] text-gradient-green">{value}</div>
              <div className="mt-1 text-[13px] text-muted-foreground font-medium">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
  )
}

const HeroVisual = () => (
  <div className="relative h-[600px]">
    <div className="absolute inset-0 animate-glow" style={{ background: 'radial-gradient(ellipse at 55% 40%, hsl(var(--accent) / 0.1), transparent 70%)' }} />

    {/* Google Local Pack mockup */}
    <div className="absolute top-0 right-0 left-4 rounded-xl overflow-hidden shadow-elevated bg-[#070707] border border-white/[0.08]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5 shrink-0">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 bg-white/[0.06] rounded-full px-3 py-1.5 flex items-center gap-2">
          <Search size={9} className="text-muted-foreground shrink-0" />
          <span className="text-[10px] text-foreground/70 font-medium">painters near me berkshires ma</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Map strip */}
        <div className="rounded-xl overflow-hidden relative h-[88px]" style={{ background: 'linear-gradient(135deg, hsl(150 15% 10%), hsl(155 12% 8%))' }}>
          {/* Grid roads */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          {/* Road highlights */}
          <div className="absolute top-[42%] left-0 right-0 h-[2px] bg-white/[0.07]" />
          <div className="absolute top-0 bottom-0 left-[35%] w-[2px] bg-white/[0.07]" />
          <div className="absolute top-0 bottom-0 left-[68%] w-[2px] bg-white/[0.04]" />
          {/* Map pins */}
          <div className="absolute top-2.5 left-[30%]">
            <div className="h-6 w-6 rounded-full bg-accent border-2 border-background flex items-center justify-center text-[9px] font-bold text-[#0A0A0A] shadow-[0_0_12px_hsl(var(--accent)/0.7)]">1</div>
            <div className="w-1 h-1 rounded-full bg-accent mx-auto" />
          </div>
          <div className="absolute top-6 left-[58%]">
            <div className="h-5 w-5 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-[8px] font-bold text-white/50">2</div>
          </div>
          <div className="absolute top-3 left-[74%]">
            <div className="h-5 w-5 rounded-full bg-white/15 border border-white/15 flex items-center justify-center text-[8px] font-bold text-white/40">3</div>
          </div>
          {/* Location label */}
          <div className="absolute bottom-2 right-3 flex items-center gap-1">
            <Navigation size={8} className="text-white/30" />
            <span className="text-[8px] text-white/25 font-mono">Berkshire County, MA</span>
          </div>
        </div>

        {/* Result #1 — client, highlighted */}
        <div className="rounded-xl border border-accent/35 bg-accent/[0.06] p-3">
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center text-[10px] font-bold text-[#0A0A0A] shrink-0 shadow-[0_0_10px_hsl(var(--accent)/0.4)]">1</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-accent leading-tight">Harbor Painting Co.</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex gap-px">{[0,1,2,3,4].map(i => <Star key={i} size={9} className="text-amber-400 fill-amber-400" />)}</div>
                <span className="text-[9px] text-foreground/60 font-medium">4.9 · 127 reviews</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] text-muted-foreground">Painters · Lenox, MA</span>
                <span className="text-[9px] text-emerald-400 font-medium">Open · Closes 6 PM</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="flex items-center gap-1 bg-accent/15 rounded-full px-2 py-0.5">
                <Phone size={8} className="text-accent" />
                <span className="text-[8px] text-accent font-semibold">Call</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result #2 */}
        <div className="rounded-xl border border-border bg-white/[0.02] p-3 opacity-55">
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/40 shrink-0">2</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-foreground/65 leading-tight">Berkshire Pro Painters</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex gap-px">{[0,1,2,3].map(i => <Star key={i} size={9} className="text-amber-400/50 fill-amber-400/50" />)}<Star size={9} className="text-white/10 fill-white/10" /></div>
                <span className="text-[9px] text-muted-foreground/50">4.1 · 43 reviews</span>
              </div>
              <div className="text-[9px] text-muted-foreground/40 mt-0.5">Painters · Pittsfield, MA</div>
            </div>
          </div>
        </div>

        {/* Result #3 */}
        <div className="rounded-xl border border-border/50 bg-white/[0.01] p-3 opacity-30">
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[10px] font-medium text-white/30 shrink-0">3</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-foreground/40 leading-tight">Valley Painting LLC</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex gap-px">{[0,1,2,3].map(i => <Star key={i} size={9} className="text-amber-400/25 fill-amber-400/25" />)}<Star size={9} className="text-white/8 fill-white/8" /></div>
                <span className="text-[9px] text-muted-foreground/30">3.8 · 12 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating chips */}
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-8 top-[44%] rounded-xl px-3.5 py-2.5 flex items-center gap-3 shadow-offset bg-[#070707] border border-white/[0.08]">
      <div className="h-8 w-8 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
        <Star size={14} className="text-accent fill-accent" />
      </div>
      <div>
        <div className="text-[12px] font-bold">4.9 Google</div>
        <div className="text-[10px] text-muted-foreground">+27 new reviews</div>
      </div>
    </motion.div>

    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -right-6 bottom-20 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-offset bg-[#070707] border border-white/[0.08]">
      <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
        <TrendingUp size={14} className="text-accent" />
      </div>
      <div>
        <div className="text-[12px] font-bold text-accent">+184% reach</div>
        <div className="text-[10px] text-muted-foreground">After rebuild</div>
      </div>
    </motion.div>

    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute left-6 bottom-4 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 bg-[#070707] border border-white/[0.08]">
      <Check size={11} className="text-accent" />
      <span className="text-[10px] font-semibold">#1 in local results</span>
    </motion.div>

    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute right-4 top-[11%] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 bg-[#070707] border border-white/[0.08]">
      <MapPin size={10} className="text-accent" />
      <span className="text-[10px] font-semibold">Verified local</span>
    </motion.div>
  </div>
)
