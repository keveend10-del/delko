'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from './Section'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: "How is this different from other agencies I've tried?",
    a: "Most agencies sell you a package and disappear into a dashboard. We're two people working exclusively in Berkshire County and North Shore — we know your competitors by name, we answer our phones, and we work your account personally. If it's not working, you'll hear from us before the next invoice, not after.",
  },
  {
    q: "How long until I start seeing results?",
    a: "Google profile fixes show movement in 4–8 weeks. Paid ads can ring your phone in week one. At the 30-day mark we send you an honest update — not a vague 'it takes time.' You'll know exactly what's moving and what we're working on next.",
  },
  {
    q: "Do I actually need a new website?",
    a: "Not always. We audit what you have first. If it's fast, mobile-friendly, and people can call you in two taps, we work with it. If it's slow, confusing, or embarrassing to send someone to, we'll show you exactly what it's costing you — and what a fix would run.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Home services, med spas, law firms, hospitality — painters, HVAC, landscapers, electricians, plumbers. Anyone in Berkshire County or the North Shore whose phone should be ringing more than it is. If your customers search locally before they buy, we can help.",
  },
  {
    q: "What does a 'free digital audit' actually mean?",
    a: "We pull up your Google profile, your website, and your top competitors — then show you exactly what a real customer sees when they search for your service. Takes us about 30 minutes. There's no pitch at the end. Just a plain list of what's costing you jobs and what to fix first.",
  },
  {
    q: "I'm already showing up on Google. Why would I need this?",
    a: "Showing up on a keyword list and showing up for your actual customer are different things now. Google personalizes results based on who's searching. We check whether the buyer in your service area — the one ready to spend this week — is actually finding you. That's a very different question than a rank report.",
  },
  {
    q: "Am I locked into a contract?",
    a: "Month-to-month only. No 12-month lock-ins, no cancellation fees. If we're not getting you results within 60 days, you should be able to leave. We stay because the work actually works — not because you're stuck.",
  },
  {
    q: "What if I have zero online presence right now?",
    a: "Honestly, that's a clean starting point. No bad reviews to undo, no outdated site to untangle. We build the foundation right the first time — Google profile, a fast site, the right service pages for your area — and you start getting calls within weeks, not months.",
  },
  {
    q: "What's the real difference between your three packages?",
    a: "Foundation gets your Google profile and website working together to bring in calls. Growth adds a review system, email follow-up, and local SEO pages to turn those calls into consistent leads. Dominate adds paid ads, CRM automation, and conversion tracking for businesses ready to own their market.",
  },
  {
    q: "Do you only work in Berkshire County and North Shore?",
    a: "For now, yes — and that's intentional. Keeping our markets tight means we actually know your local competitive landscape. We know which contractors dominate the Berkshires, who's running ads in Salem, and what your neighbors are charging. You get strategy built for your market, not a generic playbook from an agency three states away.",
  },
]

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-border-strong' : 'hover:border-border-strong'}`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-6 px-7 py-6 text-left group cursor-pointer"
    >
      <span className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.02em] leading-snug group-hover:text-foreground transition-colors">
        {item.q}
      </span>
      <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-accent border-accent/50 rotate-45' : 'border-border group-hover:border-border-strong'}`}>
        <Plus size={14} className={`transition-colors duration-200 ${isOpen ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
          className="overflow-hidden"
        >
          <div className="px-7 pb-7">
            <div className="h-px bg-border mb-5" />
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
              {item.a}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title={<>Questions we get <span className="font-display-italic text-muted-foreground">all the time.</span></>}
      subtitle="Straight answers. No agency-speak."
      align="center"
    >
      <div className="space-y-3 max-w-3xl mx-auto">
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </Section>
  )
}
