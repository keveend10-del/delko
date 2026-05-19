'use client'

import { motion } from 'framer-motion'
import { Section } from './Section'

const founders = [
  {
    name: 'Keveen Delgado',
    role: 'Co-Founder — Systems & Delivery',
    bio: "I'm Keveen. I'm connected to both the Berkshires and the North Shore, and I've spent the last few years building websites, startup systems, and AI workflows. I started Delko because I kept seeing good local businesses lose work to competitors who simply looked better online. My job is to make sure the website, Google presence, follow-up, and reporting actually work — not just look nice.",
    initials: 'KD',
  },
  {
    name: 'Jack Koutrobis',
    role: 'Co-Founder — Sales & Relationships',
    bio: "I'm Jack. I'm from the area, and I know how much local business still runs on trust, reputation, and word of mouth. I started Delko because too many good businesses are relying only on referrals while competitors pass them online. My role is simple: start real conversations, understand what owners need, and make sure clients always know who they're working with.",
    initials: 'JK',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.12 },
  }),
}

export const WhoWeAre = () => (
  <Section
    id="founders"
    eyebrow="The Team"
    title={<>Two people. Real names.<br /><span className="font-display-italic text-muted-foreground">You know who's doing the work.</span></>}
    subtitle="We're a two-person agency — no account managers, no handoffs. When you work with Delko, you work with us."
  >
    <div className="grid md:grid-cols-2 gap-6 mb-20">
      {founders.map((f, i) => (
        <motion.div
          key={f.name}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          className="glass-card rounded-xl p-8 flex flex-col gap-6 hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          <div className="w-full aspect-square rounded-lg bg-card border border-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--accent)/0.04) 0%, transparent 60%)' }} />
            <span className="text-[13px] font-medium tracking-[0.04em] text-muted-foreground/40 z-10">{f.name}</span>
          </div>
          <div>
            <div className="text-[19px] font-bold tracking-[-0.02em] mb-1">{f.name}</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-glow mb-4">{f.role}</div>
            <p className="text-[15px] text-muted-foreground leading-[1.75]">{f.bio}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Why we started */}
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="grid md:grid-cols-[260px_1fr] gap-12 md:gap-20 items-start"
    >
      <div>
        <div className="eyebrow mb-4">Our Story</div>
        <h3 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] leading-tight">Why we started Delko</h3>
      </div>
      <div className="space-y-5 text-[16px] sm:text-[17px] text-muted-foreground leading-[1.85]">
        <p>We kept seeing the same thing: <strong className="text-foreground font-medium">good local businesses doing better work than their competitors but still losing attention online.</strong> Not because they were worse. Because their website looked outdated, their Google profile was weak, their reviews were not being used, or their follow-up system was basically just memory and missed texts.</p>
        <p>Good people. Real businesses. Solid work. But when someone searched online, a worse competitor showed up first and looked sharper.</p>
        <p>That did not sit right with us. <strong className="text-foreground font-medium">Delko exists to fix that</strong> — without making marketing feel confusing, overpriced, or fake.</p>
      </div>
    </motion.div>
  </Section>
)
