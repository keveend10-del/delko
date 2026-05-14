import { motion } from 'framer-motion'
import { Section } from './Section'
import { Monitor, Share2, MapPin, Search, Camera, TrendingUp, ArrowUpRight } from 'lucide-react'

const services = [
  { icon: Monitor, n: 'S01', title: 'A site that builds trust signals', desc: 'Fast, mobile-first, clearly written — so when Google evaluates your business for a searcher\'s profile, it sees a real, credible operation. And when the person lands, they call.', tags: ['Design', 'Build', 'Copy'] },
  { icon: Share2, n: 'S02', title: 'Social presence that feeds the algorithm', desc: "Active social pages aren't just for followers — they're behavioral signals Google reads to establish you as a legitimate local business. We keep them alive and consistent.", tags: ['Bios', 'Templates', 'Voice'] },
  { icon: MapPin, n: 'S03', title: 'Google Business Profile', desc: "Your GBP is the single richest context signal you can send Google. Real photos, accurate service areas, weekly posts, and a review system — all telling Google exactly who you serve.", tags: ['GBP', 'Reviews', 'Posts'] },
  { icon: Search, n: 'S04', title: 'Context-first local SEO', desc: "We don't chase keyword positions. We build the architecture that tells Google you're the right contextual match — so you show up when the person searching is actually your customer.", tags: ['Context', 'Local', 'Schema'] },
  { icon: Camera, n: 'S05', title: 'Content from your real jobs', desc: 'Before/after photos, short videos, simple captions from real work — they strengthen the behavioral signals Google uses to decide who\'s relevant, and they build trust with the humans too.', tags: ['Photo', 'Video', 'Calendar'] },
  { icon: TrendingUp, n: 'S06', title: 'Monthly signal maintenance', desc: "Context signals decay if you stop feeding them. We keep everything active — posts, ads, reviews, site updates — and send you a plain-English report on what's working.", tags: ['Retainer', 'Reporting', 'Edits'] },
]

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export const Services = () => (
  <Section
    id="services"
    eyebrow="Services / 06"
    title={<>Built for <span className="font-display-italic text-muted-foreground">how Google works now.</span></>}
    subtitle="Every service we offer is designed to build the context signals Google uses to route customers. Not keyword lists. Not rankings dashboards. Actual visibility."
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid md:grid-cols-2 gap-4 sm:gap-5"
    >
      {services.map(({ icon: Icon, n, title, desc, tags }) => (
        <motion.article
          key={n}
          variants={card}
          whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          className="group glass-card rounded-xl p-7 sm:p-9 hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden relative cursor-default"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 0%, hsl(var(--accent)/0.06), transparent 70%)' }} />
          <div className="flex items-start justify-between mb-7 relative">
            <motion.div
              whileHover={{ rotate: -5, scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="h-12 w-12 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-300"
            >
              <Icon size={20} />
            </motion.div>
            <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground/60">{n}</span>
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.025em] leading-tight relative">{title}</h3>
          <p className="mt-3.5 text-[15px] text-muted-foreground leading-relaxed relative">{desc}</p>
          <div className="mt-7 flex items-center justify-between relative">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-accent/30 group-hover:text-foreground/70 transition-colors">{t}</span>
              ))}
            </div>
            <ArrowUpRight size={16} className="text-muted-foreground/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
          </div>
        </motion.article>
      ))}
    </motion.div>
  </Section>
)
