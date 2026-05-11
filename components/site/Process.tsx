'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section } from './Section'
import { Search, ListChecks, Hammer, TrendingUp } from 'lucide-react'

const steps = [
  { n: '01', icon: Search, title: 'Free Digital Audit', desc: "We pull up your site, your Google profile, your socials, and tell you exactly where you're losing jobs. No charge, no pitch." },
  { n: '02', icon: ListChecks, title: 'A plain-English plan', desc: "You get a short list of fixes in order of what'll bring you the most calls. No 40-page report nobody reads." },
  { n: '03', icon: Hammer, title: 'We do the work', desc: "We rebuild the site, fix the Google profile, get the ads running. Usually two to four weeks. You stay focused on jobs." },
  { n: '04', icon: TrendingUp, title: 'We keep it running', desc: "Posts, ad tweaks, review follow-ups, monthly reports. You always know what's working and what we're trying next." },
]

export const Process = () => {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.85', 'end 0.5'] })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="process"
      eyebrow="Process / 04"
      title={<>How it <span className="font-display-italic text-muted-foreground">works.</span></>}
      subtitle="Four steps. No surprises. No long meetings."
    >
      <div className="relative">
        {/* Static track */}
        <div className="absolute left-7 top-10 bottom-10 w-px bg-border/40 hidden sm:block" />
        {/* Scroll-linked fill */}
        <div className="absolute left-7 top-10 bottom-10 w-px hidden sm:block overflow-hidden">
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="h-full w-full origin-top"
          >
            <div className="h-full w-full" style={{ background: 'linear-gradient(to bottom, hsl(var(--accent) / 0.8), hsl(var(--accent) / 0.2))' }} />
          </motion.div>
        </div>

        <motion.ol
          ref={listRef}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-3"
        >
          {steps.map(({ n, icon: Icon, title, desc }) => (
            <motion.li
              key={n}
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }}
              whileHover={{ x: 4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              className="group relative sm:pl-20 py-7 sm:py-8 px-7 sm:px-0 glass-card rounded-2xl sm:bg-transparent sm:border-transparent sm:shadow-none hover:glass-card sm:hover:bg-surface sm:hover:border-border transition-all duration-300 sm:rounded-2xl cursor-default"
            >
              <div className="hidden sm:flex absolute left-0 top-7 items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5, transition: { duration: 0.2 } }}
                  className="relative z-10 h-14 w-14 rounded-full bg-surface border border-border-strong flex items-center justify-center group-hover:border-accent/40 group-hover:bg-surface-elevated transition-all duration-300"
                >
                  <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </motion.div>
              </div>
              <div className="grid sm:grid-cols-12 gap-3 sm:gap-8 items-start">
                <div className="sm:col-span-3 flex items-center gap-3 sm:pt-1">
                  <Icon size={16} className="sm:hidden text-accent shrink-0" />
                  <span className="text-[11px] font-bold font-mono tracking-[0.18em] text-muted-foreground uppercase">Step {n}</span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.025em]">{title}</h3>
                  <p className="mt-2.5 text-[15px] text-muted-foreground leading-relaxed max-w-xl">{desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  )
}
