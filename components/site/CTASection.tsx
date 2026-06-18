import { motion } from 'framer-motion'
import { AuditForm } from './AuditForm'

const bullets = ['You talk to the founders, not a rep.', 'Back to you within 1 business day.', 'No pitch deck. No pressure. No commitment.']

export const CTASection = () => (
  <section id="audit" className="relative pt-12 pb-28 sm:pt-16 sm:pb-36 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, hsl(var(--accent) / 0.08), transparent 65%)' }} />

    <div className="container mx-auto px-5 sm:px-8 relative">
      <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
        >
          <div className="eyebrow mb-7">Free AI Visibility Audit · No pitch deck</div>
          <h2 className="text-[36px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.0] tracking-[-0.04em]">
            Let&apos;s talk about{' '}
            <span className="font-display-italic text-muted-foreground">your business.</span>
          </h2>
          <p className="mt-7 text-[17px] text-muted-foreground leading-relaxed">
            No decks, no jargon. We&apos;ll ask about your goals, what&apos;s not working, and whether we&apos;re a fit. If we can help, we&apos;ll tell you exactly how. Starting at $2,000/mo.
          </p>
          <ul className="mt-8 space-y-3.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[14px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="lg:col-span-7"
        >
          <AuditForm />
        </motion.div>
      </div>
    </div>
  </section>
)
