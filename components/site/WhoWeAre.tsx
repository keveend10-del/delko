'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section } from './Section'

const founders = [
  {
    name: 'Keveen Delgado',
    role: 'Strategy & Growth',
    bio: "Keveen runs client strategy, paid growth, and the systems that keep everything moving. He built Delko because local businesses deserve marketing that actually drives revenue — not retainers that deliver reports.",
    initials: 'KD',
    photo: '/keveen.jpg',
  },
  {
    name: 'Jack Koutrobis',
    role: 'Brand & Creative',
    bio: "Jack runs brand identity, web design, and creative direction. He's worked with businesses across the North Shore and knows that trust is earned through how you look before anyone picks up the phone.",
    initials: 'JK',
    photo: '/jack.jpg',
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

function FounderCard({ founder, index }: { founder: typeof founders[0]; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="glass-card rounded-xl p-8 flex flex-col items-center gap-6 hover:border-border-strong hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45),0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      <div className="flex justify-center">
        {founder.photo && !imgError ? (
          <Image
            src={founder.photo}
            alt={founder.name}
            width={200}
            height={200}
            priority
            className="rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-[200px] h-[200px] rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">{founder.initials}</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <div className="text-[19px] font-bold tracking-[-0.02em] mb-1">{founder.name}</div>
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-glow mb-4">{founder.role}</div>
        <p className="text-[15px] text-muted-foreground leading-[1.75]">{founder.bio}</p>
      </div>
    </motion.div>
  )
}

export const WhoWeAre = () => (
  <Section
    id="founders"
    eyebrow="The Team"
    title={<>Two people. Real names.<br /><span className="font-display-italic text-muted-foreground">You know who&apos;s doing the work.</span></>}
    subtitle="We're a two-person agency — no account managers, no handoffs. When you work with Delko, you work with us."
  >
    <div className="grid md:grid-cols-2 gap-6 mb-20">
      {founders.map((f, i) => (
        <FounderCard key={f.name} founder={f} index={i} />
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
        <p>We kept seeing good local businesses doing better work — but losing jobs to competitors with newer websites and fuller Google profiles. Reviews weren&apos;t being used. Follow-up was just memory and missed texts.</p>
        <p>Someone would search, a worse competitor showed up first, and the job went elsewhere.</p>
        <p>We started Delko to close that gap — website, Google, reviews, follow-up — without making it feel like a whole thing.</p>
      </div>
    </motion.div>
  </Section>
)
