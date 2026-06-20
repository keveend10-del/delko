import { motion } from 'framer-motion'
import { Section } from './Section'

export const Testimonials = () => (
  <Section
    id="testimonials"
    eyebrow="Client Results"
    title={<>First results. <span className="font-display-italic text-muted-foreground">Coming soon.</span></>}
    subtitle="We're working with our first clients now. Case studies and testimonials will be published as results come in."
    align="center"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-xl p-10 sm:p-14 text-center max-w-xl mx-auto"
    >
      <div className="text-[15px] text-foreground/60 leading-relaxed">
        No fabricated numbers. No stock testimonials.<br />
        Real client progress — published when it&rsquo;s earned.
      </div>
      <div className="mt-6 text-[12px] text-muted-foreground/40 font-mono tracking-wide uppercase">
        First case studies in progress
      </div>
    </motion.div>
  </Section>
)
