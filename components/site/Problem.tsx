import { motion } from 'framer-motion'
import { Section } from './Section'
import { Globe, Search, Star, MessageSquare } from 'lucide-react'

const problems = [
  { n: '01', icon: Search, title: 'Customers search differently now', sub: 'Google, Maps, and AI tools answer questions directly. If you\'re not set up there, ready buyers can\'t find you.' },
  { n: '02', icon: Star, title: 'Weak reviews and trust signals', sub: 'Thin reviews or unanswered feedback sends customers to your competitors before you even know they looked.' },
  { n: '03', icon: Globe, title: 'Website loses leads, not wins them', sub: 'No clear call button. No booking link. Slow on mobile. Visitors leave without ever contacting you.' },
  { n: '04', icon: MessageSquare, title: 'Leads fall through the cracks', sub: 'No follow-up system means missed calls become lost jobs. Most businesses lose customers they never knew they had.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export const Problem = () => (
  <Section
    id="problem"
    eyebrow="The gap"
    title={<>Your business is <span className="font-display-italic text-muted-foreground">better</span> than what people find online.</>}
    subtitle="These are the four reasons good businesses with great work still lose customers to competitors who show up better online."
    align="center"
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {problems.map(({ n, icon: Icon, title, sub }) => (
        <motion.div
          key={n}
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
          className="group glass-card rounded-xl p-6 hover:border-border-strong hover:shadow-[4px_4px_0px_rgba(0,0,0,0.45)] transition-all duration-300 cursor-default relative overflow-hidden"
        >
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 0%, hsl(var(--accent)/0.06), transparent 70%)' }} />
          <div className="flex items-start justify-between gap-3 mb-5 relative">
            <span className="text-[10px] font-bold font-mono tracking-[0.18em] text-muted-foreground">{n}</span>
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.2 } }}
              className="h-9 w-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/20 transition-all duration-300 shrink-0"
            >
              <Icon size={16} />
            </motion.div>
          </div>
          <h3 className="text-[16px] sm:text-[17px] font-bold tracking-[-0.02em] leading-snug relative">{title}</h3>
          <p className="mt-2.5 text-[13px] text-muted-foreground leading-snug relative">{sub}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
)
