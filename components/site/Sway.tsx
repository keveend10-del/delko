'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, CalendarCheck, Heart, Repeat, UserCircle2, Layers, ArrowUpRight } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const features = [
  { icon: CheckCircle2, title: 'More phone calls', desc: 'A fast site, a fixed Google profile, and clear calls-to-action mean people actually pick up the phone.' },
  { icon: CalendarCheck, title: 'Booked-out calendars', desc: 'Local Service Ads and a simple booking flow keep your week full without you chasing leads.' },
  { icon: Heart, title: 'Reviews that bring jobs', desc: "We get your happy customers to leave 5-star reviews, then put them where the next customer can see them." },
  { icon: Repeat, title: 'Repeat customers', desc: "A simple email and text follow-up so the homeowner you painted last spring remembers you next spring." },
  { icon: UserCircle2, title: 'A real person to call', desc: "You're not customer #4,000 at some agency in another state. You text us, we text back." },
  { icon: Layers, title: 'Works with what you have', desc: "If your invoicing or scheduling already works, we leave it alone. We fix what's broken, not what isn't." },
]

export const Sway = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glow1Y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const glow2Y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section ref={ref} id="sway" className="py-28 sm:py-36">
      <div className="container mx-auto px-5 sm:px-8">
        {/* Wrapper so the outer arc lives OUTSIDE overflow:hidden */}
        <div className="relative max-w-7xl mx-auto">

          {/* Outer card arc — same padding-wrapper trick at card scale */}
          <motion.div
            className="absolute -inset-[2px] rounded-[26px] pointer-events-none z-20"
            style={{
              padding: '2px',
              background: 'conic-gradient(from 0turn, transparent 42%, hsl(var(--accent)/0.35) 70%, hsl(var(--accent)/0.8) 78%, hsl(var(--accent)/0.35) 86%, transparent 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:bg-[hsl(0_0%_4%)] dark:border-[hsl(0_0%_12%)] dark:shadow-[6px_6px_0px_rgba(0,0,0,0.5),_0_32px_80px_rgba(0,0,0,0.75)]"
        >

          {/* Delko D-mark watermark — brand stamp at low opacity */}
          <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden" style={{ width: 320, height: 320, opacity: 0.028 }}>
            <img src="/favicon.svg" alt="" className="w-full h-full object-contain translate-x-16 translate-y-16" />
          </div>

          {/* Parallax background glows */}
          <motion.div style={{ y: glow1Y }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 90% -5%, hsl(var(--accent) / 0.14), transparent 60%)' }} />
          </motion.div>
          <motion.div style={{ y: glow2Y }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 40% at 0% 100%, hsl(var(--accent) / 0.05), transparent 50%)' }} />
          </motion.div>

          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 80% 0%, black, transparent 65%)' }} />

          <div className="relative p-8 sm:p-14 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-10 mb-14">
              <div className="lg:col-span-7">
                <div className="eyebrow mb-6">What you actually get</div>
                <h2 className="text-[40px] sm:text-[56px] font-bold leading-[1.0] tracking-[-0.04em]">
                  Real <span className="font-display-italic text-muted-foreground">results</span> for real local businesses.
                </h2>
                <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-lg">
                  We&apos;re two guys from the area who got tired of watching good local businesses lose work to competitors who aren&apos;t actually better — just better at sending the right signals to Google.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border">
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  We work the new model — context signals, not keyword rankings. Month-to-month, no contracts. You&apos;ll know within 60 days if the phone is ringing more. If it&apos;s not, we&apos;ll tell you straight up.
                </p>
              </div>
            </div>

            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {features.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
                  whileHover={{ y: -3, zIndex: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                  className="group relative bg-surface hover:bg-surface-elevated p-7 transition-all duration-300 cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 20%, hsl(var(--accent)/0.07), transparent 70%)' }} />

                  {/*
                    Arc reactor icon — padding wrapper technique (no mask needed):
                    outer div has p-[2px] gap, absolute conic fills full 44×44,
                    inner icon div covers center with solid bg → conic shows only in the 2px ring
                  */}
                  <div className="relative mb-5 rounded-xl" style={{ width: 44, height: 44, padding: '2px' }}>
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `conic-gradient(from 0turn, transparent 52%, hsl(var(--accent)/0.6) 72%, hsl(var(--accent)) 80%, hsl(var(--accent)/0.6) 88%, transparent 100%)`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -5, transition: { duration: 0.2 } }}
                      className="relative h-full w-full rounded-[9px] bg-surface group-hover:bg-surface-elevated dark:bg-[hsl(0_0%_7%)] flex items-center justify-center text-muted-foreground group-hover:text-accent transition-colors duration-300"
                    >
                      <Icon size={18} />
                    </motion.div>
                  </div>

                  <h3 className="text-[15px] font-bold tracking-[-0.02em] relative">{title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed relative">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-8 border-t border-border">
              <p className="text-[14px] text-muted-foreground max-w-lg leading-relaxed">
                Want to see what we&apos;d do for your business specifically? Send us your name and website. Free audit within a couple days.
              </p>
              <Button asChild variant="accent" size="lg" className="shrink-0">
                <a href="/#audit" onClick={() => trackCTAClick('get_free_audit', 'results_section')}>Get a Free Audit <ArrowUpRight /></a>
              </Button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
