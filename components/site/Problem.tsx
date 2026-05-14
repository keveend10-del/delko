import { motion } from 'framer-motion'
import { Section } from './Section'
import { Globe, Instagram, MapPin, MessageSquare } from 'lucide-react'

const problems = [
  { n: '01', icon: Globe, title: 'A website nobody calls from', desc: 'Slow, hard to read on a phone, and the phone number is buried. People leave before they ever pick up.' },
  { n: '02', icon: Instagram, title: 'Social pages collecting dust', desc: "Last post was 2022. When a homeowner checks you out, it looks like the business is closed." },
  { n: '03', icon: MapPin, title: "Google profile that's hurting you", desc: "Missing photos, wrong hours, no replies to reviews. It's the first thing every neighbor sees." },
  { n: '04', icon: MessageSquare, title: 'No easy way to book a job', desc: 'No clear button, no quick form, no text option. Ready customers go to the next guy on the list.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export const Problem = () => (
  <Section
    id="problem"
    eyebrow="The gap"
    title={<>Your business is <span className="font-display-italic text-muted-foreground">better</span> than what people find online.</>}
    subtitle="Most local businesses we work with do great work. The problem isn't quality — it's that Google can't see it. Every missing photo, dead social page, and ignored review is a signal telling Google you're not the right match for the customer searching right now."
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid lg:grid-cols-2 gap-4"
    >
      {problems.map(({ n, icon: Icon, title, desc }) => (
        <motion.div
          key={n}
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          className="group glass-card rounded-xl p-8 sm:p-10 hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-default overflow-hidden relative"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 0%, hsl(var(--accent)/0.05), transparent 70%)' }} />
          <div className="flex items-start justify-between gap-6 relative">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-bold font-mono tracking-[0.18em] text-muted-foreground">{n}</span>
                <span className="h-px w-8 bg-border-strong" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] leading-tight">{title}</h3>
              <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{desc}</p>
            </div>
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.25 } }}
              className="h-12 w-12 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:border-accent/20 transition-all duration-300 shrink-0"
            >
              <Icon size={20} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
)
