'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from './Section'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: "How is this different from other agencies I've tried?",
    a: "Most agencies hand you off to an account manager who read a one-page brief about you. Delko is two founders — Keveen and Jack — and we're on every account personally. No handoffs, no layers. We're also a full-service shop: brand, web, social, paid ads, SEO, and AI search visibility under one roof. You get one team with a complete picture of your business, not four vendors who don't talk to each other.",
  },
  {
    q: "How long until I start seeing results?",
    a: "Google profile fixes show movement in 4–8 weeks. Website and review improvements compound from there. At the 30-day mark we send you an honest update — not a vague 'it takes time.' You'll know exactly what's moving and what we're working on next.",
  },
  {
    q: "Do I actually need a new website?",
    a: "Not always. We audit what you have first. If it's fast, mobile-friendly, and people can call you in two taps, we work with it. If it's slow, confusing, or embarrassing to send someone to, we'll show you exactly what it's costing you — and what a fix would run.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Mainly home service businesses — pressure washing, painting, HVAC, plumbing, roofing, electricians, landscaping, remodeling, flooring, and cleaners. We also work with med spas, salons, gyms, law firms, and other local service businesses across Berkshire County and the North Shore. If your customers search locally before they choose, we can help.",
  },
  {
    q: "What happens on the free strategy call?",
    a: "It's a 30-minute conversation — no pitch deck, no jargon. We'll ask about your business, your goals, what's not working, and what you've tried. By the end you'll have a clear sense of what the problem actually is and whether we're the right fit to fix it. No obligation either way.",
  },
  {
    q: "What is local AI visibility and why does it matter?",
    a: "Search is changing fast. People aren't just clicking through 10 blue links anymore — they're asking Google AI, ChatGPT, and Gemini who they should trust. These tools pull from your website, reviews, Google profile, and local data to decide if your business is worth recommending. If that information is incomplete, inconsistent, or thin, you get skipped — even if you rank on the regular results page. Local AI visibility means making your business easy for these tools to understand and recommend.",
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
    a: "Starter Presence builds the foundation — brand, website, Google profile, review system, and lead capture at $2,000/mo. Local Growth System adds local SEO service pages, review generation, follow-up automation, and AI search readiness to build consistent leads month over month at $2,500/mo. Growth Partner adds paid ads, CRM setup, advanced automations, and reputation management for businesses ready to own their market at $4,500/mo.",
  },
  {
    q: "Why shouldn't I just use ChatGPT myself?",
    a: "You can — and you should. But most business owners don't have time to turn AI outputs into a complete marketing system. Delko uses AI to move faster, but every strategy, website, campaign, and piece of content is reviewed by real people before it goes live. The difference isn't just using AI — it's knowing what to ask, what to ignore, what to edit, and how to turn the output into something that actually brings in customers.",
  },
  {
    q: "What is GEO and how does it help my business?",
    a: "GEO stands for Generative Engine Optimization — it's SEO for AI tools like ChatGPT, Perplexity, and Google AI. When someone types 'best HVAC company near me' into one of these tools, the AI reads your website, reviews, Google profile, and citations to decide who to recommend. GEO means structuring your content so AI tools can understand and recommend your business — not just search engines.",
  },
  {
    q: "How do reviews affect Google and AI visibility?",
    a: "Reviews are now a two-way signal. Google uses review volume, recency, and response patterns to rank you in local results. AI tools like ChatGPT and Google AI use your reviews as evidence of credibility — a business with 80 detailed, recent five-star reviews is far more likely to be recommended than one with 12 reviews from three years ago. We build a review system that generates steady, real reviews without you having to think about it.",
  },
  {
    q: "Do you only work in Berkshire County and North Shore?",
    a: "For now, yes — and that's intentional. Keeping our markets tight means we actually know your local competitive landscape. We know which contractors dominate the Berkshires, who's running ads in Salem, and what your neighbors are charging. You get strategy built for your market, not a generic playbook from an agency three states away.",
  },
  {
    q: "How can my business show up in AI search results?",
    a: "AI tools like ChatGPT, Gemini, and Google AI pull from your website, Google Business Profile, reviews, and local citations to decide what to recommend. The key is consistent, complete information across all those places — clear service pages, real reviews, accurate business details, and content that answers the questions your customers actually ask. That's exactly what we build.",
  },
  {
    q: "What is AEO?",
    a: "AEO — Answer Engine Optimization — means structuring your content so AI tools pull your business as the direct answer to a customer's question. When someone asks 'who does the best roofing in Salem, MA?' an AEO-optimized presence gives AI the right signals to recommend you. It's about being the answer, not just a result.",
  },
  {
    q: "Can AI recommend my local business to customers?",
    a: "Yes — and it's already happening. When someone asks ChatGPT or Google AI for a recommendation, those tools scan your online presence to decide who to suggest. Businesses with clear service pages, strong reviews, complete Google profiles, and consistent local citations get recommended. Thin or inconsistent info means you get skipped.",
  },
  {
    q: "Do you build websites only, or do you manage everything after launch?",
    a: "Both. If you just need a website, our Website Sprint packages start at $1,500 — you get a professional site, mobile optimization, service pages, and 30 days of support. If you want ongoing help, our monthly plans cover updates, content, SEO, Google visibility, reviews, and follow-up systems. Most clients start with a project and move to a monthly plan once they see results.",
  },
  {
    q: "Can you run seasonal campaigns for my business?",
    a: "Yes. A lot of local businesses have their best months and their slow months, and a well-timed campaign can change the trajectory of a quarter. We build seasonal campaign packages for summer pushes, holiday offers, slow-season promotions, and event-based marketing — including a landing page, social content, Google Business Profile posts, and offer positioning.",
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
      <div className="grid md:grid-cols-2 gap-3 max-w-6xl mx-auto items-start">
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
