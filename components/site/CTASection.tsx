import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const bullets = ['You talk to the founders, not a rep.', 'Back to you within 1 business day.', 'No pitch deck. No pressure. No commitment.']

export const CTASection = () => (
  <section id="cta" className="relative pt-20 pb-32 sm:pt-24 sm:pb-40 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(var(--accent) / 0.07), transparent 65%)' }} />

    <div className="container mx-auto px-5 sm:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="eyebrow mb-7">Free AI Visibility Audit · No pitch deck</div>
        <h2 className="text-[36px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.0] tracking-[-0.04em]">
          See exactly where your<br />
          <span className="font-display-italic text-muted-foreground/70">business stands online.</span>
        </h2>
        <p className="mt-7 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-xl mx-auto">
          We review your Google profile, website, reviews, and AI search visibility — then show you what to fix first. Free, no commitment.
        </p>
        <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[14px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button asChild variant="accent" size="xl">
            <a href="/audit" onClick={() => trackCTAClick('get_visibility_audit', 'cta_section')}>
              Get My Free Visibility Audit <ArrowUpRight size={16} />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
)
