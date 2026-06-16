'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ArcLight } from './ArcLight'

const pillars = [
  { n: '01', title: "Direct founders, not account managers", body: "You talk to us — not someone reading notes about you. Keveen and Jack are on every account personally. No handoffs, no layers, no client success manager. The people who built your strategy are the people doing the work." },
  { n: '02', title: "We know your market", body: "We know the difference between a Newburyport tourist and a Gloucester local. Between a leaf-peeper weekend and a year-round North Shore customer. Strategy built for your actual market — not a generic playbook from an agency three states away." },
  { n: '03', title: "Everything under one roof", body: "Brand, web, social, paid ads, SEO, AI search visibility. One team, one invoice, complete picture. No juggling vendors who don't talk to each other or blaming the 'other agency' when results are flat." },
]

export const WhyDifferent = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section ref={ref} id="why" className="relative py-28 sm:py-36 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, hsl(var(--accent) / 0.07), transparent 70%)' }} />
      </motion.div>

      <div className="container mx-auto px-5 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-4xl mb-20"
          >
            <div className="eyebrow mb-6">Why Delko</div>
            <h2 className="text-[40px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.0] tracking-[-0.04em]">
              Big agencies don&apos;t know{' '}
              <span className="font-display-italic text-muted-foreground">your market.</span>
            </h2>
            <p className="mt-7 text-[18px] text-muted-foreground leading-relaxed max-w-2xl">
              Delko is two founders, both North Shore — no account managers, no handoffs, no guessing. Just work that fits your market, your customers, and your goals.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid lg:grid-cols-3 gap-5 mb-16"
          >
            {pillars.map(({ n, title, body }, i) => (
              <motion.div
                key={n}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                className="group glass-card rounded-xl p-8 flex flex-col gap-5 hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-default overflow-hidden relative"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, hsl(var(--accent)/0.06), transparent 70%)' }} />
                <ArcLight radius={12} duration={12} delay={i * 1.3} />
                <span className="text-[10px] font-bold font-mono tracking-[0.22em] text-muted-foreground relative">{n}</span>
                <h3 className="text-[19px] font-bold tracking-[-0.025em] leading-tight relative">{title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed flex-1 relative">{body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="relative rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 cursor-default"
            style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--accent) / 0.03) 100%)', border: '1px solid hsl(var(--accent) / 0.2)', boxShadow: '0 0 60px hsl(var(--accent) / 0.06)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(var(--accent) / 0.05) 0%, transparent 60%)' }} />
            <div className="relative">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-glow mb-2">Intentionally small</div>
              <p className="text-[18px] sm:text-[20px] font-bold tracking-[-0.025em] max-w-xl">
                We serve two markets — North Shore and the Berkshires — and we plan to keep it that way. Staying tight means we actually know your competitive landscape. That&apos;s the work.
              </p>
            </div>
            <a href="/about" className="relative inline-flex items-center gap-2 text-[14px] font-bold text-accent whitespace-nowrap hover:gap-3 transition-all duration-200">
              Meet the founders <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
