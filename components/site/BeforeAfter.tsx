import { motion } from 'framer-motion'
import { Section } from './Section'
import { X, Check, Phone, Star, MapPin, ArrowUpRight } from 'lucide-react'

const before = ['Site nobody can read on a phone', 'Photos from 2014', 'Empty Instagram', 'Phone number buried somewhere', 'Skipped over for the next guy']
const after = ['Fast site that works on any phone', 'Real photos of real jobs', 'Clear pricing and service areas', 'Reviews front and center', 'Call, text, or book in two taps', 'More qualified leads every week']

export const BeforeAfter = () => (
  <Section
    id="before-after"
    eyebrow="Transformation"
    title={<>Before and <span className="font-display-italic text-muted-foreground">after.</span></>}
    subtitle="Same business, same crew. Just showing up where customers are looking."
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid lg:grid-cols-2 gap-5"
    >
      {/* ── Before card ── */}
      <motion.div
        variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
        whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        className="glass-card rounded-2xl p-7 sm:p-9 hover:border-border-strong transition-all duration-300 cursor-default"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="eyebrow text-muted-foreground/60">Before</div>
          <span className="text-[10px] font-bold font-mono text-muted-foreground/40">v1 / 2014</span>
        </div>

        {/* Old website mockup */}
        <div className="rounded-xl border border-border overflow-hidden mb-6" style={{ background: 'hsl(0 0% 5%)' }}>
          {/* Messy nav bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 bg-white/[0.03]">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2 w-2 rounded-full bg-white/10" />
              <div className="h-2 w-2 rounded-full bg-white/10" />
              <div className="h-2 w-2 rounded-full bg-white/10" />
            </div>
            <div className="text-[8px] text-muted-foreground/40 font-mono">www.harborpaint.com</div>
            <div className="w-8" />
          </div>
          {/* Bad nav */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/40 bg-white/[0.015] overflow-hidden">
            <div className="text-[7px] font-bold text-white/40 tracking-wider uppercase whitespace-nowrap">HARBOR PAINTING & HOME IMPROVEMENTS LLC</div>
            <div className="ml-auto flex gap-2 shrink-0">
              {['Home','About','Services','Gallery','Contact','FAQ','Blog'].map(l => (
                <span key={l} className="text-[7px] text-white/25 whitespace-nowrap">{l}</span>
              ))}
            </div>
          </div>
          {/* Cluttered hero */}
          <div className="px-3 py-3 space-y-2">
            <div className="w-full h-16 rounded bg-white/[0.04] flex items-center justify-center">
              <span className="text-[8px] text-white/15 uppercase tracking-widest">[ STOCK PHOTO HERE ]</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {['#Painting','#Affordable','#Professional','#Berkshires','#Licensed','#Insured','#FreeEstimate'].map(t => (
                <span key={t} className="text-[7px] text-white/20 bg-white/[0.03] px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
            <div className="h-1.5 w-3/4 bg-white/[0.06] rounded" />
            <div className="h-1.5 w-full bg-white/[0.04] rounded" />
            <div className="h-1.5 w-5/6 bg-white/[0.04] rounded" />
            <div className="h-1.5 w-2/3 bg-white/[0.04] rounded" />
            <div className="mt-2 text-[7px] text-white/20">
              Call us: 413-555-0123 (Mon-Fri 9am-5pm) · harborpaint@aol.com
            </div>
            <div className="text-[7px] text-white/10 italic">© 2008 Harbor Painting. All rights reserved. Site by WebDesigns4U</div>
          </div>
        </div>

        <ul className="space-y-3">
          {before.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[14px] text-muted-foreground">
              <span className="h-5 w-5 rounded-full border border-border flex items-center justify-center shrink-0">
                <X size={10} className="text-muted-foreground/60" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ── After card ── */}
      <motion.div
        variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
        whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        className="group relative rounded-2xl p-7 sm:p-9 overflow-hidden transition-all duration-300 cursor-default bg-card border border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:bg-[linear-gradient(160deg,_hsl(0_0%_11%),_hsl(0_0%_7%))] dark:border-[hsl(0_0%_20%)] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 0%, hsl(var(--accent) / 0.1), transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse at 80% 0%, hsl(var(--accent) / 0.18), transparent 60%)' }} />

        <div className="relative">
          <div className="flex items-center justify-between mb-5">
            <div className="eyebrow text-foreground/80">After</div>
            <span className="text-[10px] font-bold font-mono text-accent">v2 / Now</span>
          </div>

          {/* Modern website mockup */}
          <div className="rounded-xl border border-border-strong overflow-hidden mb-6" style={{ background: 'hsl(0 0% 5%)' }}>
            {/* Clean chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-white/[0.03]">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/50" />
                <div className="h-2 w-2 rounded-full bg-green-400/50" />
              </div>
              <div className="flex-1 bg-white/5 rounded-full px-3 py-0.5 flex items-center justify-between">
                <span className="text-[8px] text-white/50 font-medium">harborpainting.com</span>
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            </div>

            {/* Clean nav */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[9px] font-bold text-white/80">Harbor Painting</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-white/40">Services</span>
                <span className="text-[8px] text-white/40">Work</span>
                <span className="text-[8px] text-white/40">Areas</span>
                <div className="bg-accent rounded-full px-2 py-0.5">
                  <span className="text-[8px] font-bold text-[#0A0A0A]">Get a Quote</span>
                </div>
              </div>
            </div>

            <div className="px-3 py-3 space-y-2.5">
              {/* Hero content */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-white/90 leading-tight">Premium Painting in the Berkshires.</div>
                <div className="text-[8px] text-white/45 leading-relaxed">Interior & exterior. Licensed & insured. Lenox, Stockbridge, Pittsfield.</div>
              </div>

              {/* Photo grid — real-looking proportions with content */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(25 40% 15%), hsl(25 30% 10%))' }}>
                  <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5"><span className="text-[6px] text-white/60">Interior</span></div>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(200 30% 12%), hsl(200 20% 8%))' }}>
                  <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5"><span className="text-[6px] text-white/60">Exterior</span></div>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(141 20% 12%), hsl(141 15% 8%))' }}>
                  <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1 py-0.5"><span className="text-[6px] text-white/60">Before/After</span></div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-1.5">
                <div className="flex-1 h-7 rounded-full bg-accent flex items-center justify-center gap-1">
                  <span className="text-[9px] font-bold text-[#0A0A0A]">Get a Free Quote</span>
                  <ArrowUpRight size={8} className="text-[#0A0A0A]" />
                </div>
                <div className="h-7 w-7 rounded-full border border-border flex items-center justify-center">
                  <Phone size={9} className="text-white/50" />
                </div>
              </div>

              {/* Trust bar */}
              <div className="flex items-center justify-between pt-1.5 border-t border-border/40">
                <div className="flex items-center gap-1">
                  <div className="flex gap-px">{[0,1,2,3,4].map(i => <Star key={i} size={7} className="text-amber-400 fill-amber-400" />)}</div>
                  <span className="text-[8px] text-white/50 font-medium">4.9 · 127 Google reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={7} className="text-accent" />
                  <span className="text-[8px] text-white/40">3 service areas</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="space-y-3">
            {after.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[14px]">
                <span className="h-5 w-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <Check size={10} className="text-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      className="mt-8 glass-card rounded-2xl p-7 sm:p-8 hover:border-border-strong transition-all duration-300 cursor-default"
    >
      <div className="eyebrow text-accent mb-4">First case study — coming soon</div>
      <p className="text-[15px] leading-relaxed">
        <span className="font-semibold">A painting crew out of Pittsfield</span>{' '}
        <span className="text-muted-foreground">running on word-of-mouth alone. New site, new Google profile, a few small ads — and the phone hasn&apos;t stopped.</span>
      </p>
    </motion.div>
  </Section>
)
