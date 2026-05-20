import { motion } from 'framer-motion'
import { Section } from './Section'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "We'd been trying to get more calls for two years. Within 6 weeks of working with Delko our Google profile was pulling in jobs we never would've gotten. The phone actually rings now.",
    name: 'Mike R.',
    business: 'Home Services',
    location: 'Pittsfield, MA',
    stars: 5,
  },
  {
    quote: "I was skeptical because we'd tried other agencies. What's different here is they actually know this area. They knew who our competitors were before we even told them.",
    name: 'Sarah T.',
    business: 'Med Spa',
    location: 'Salem, MA',
    stars: 5,
  },
  {
    quote: "Month-to-month was the thing that sold me. No long contract means they actually have to perform. Three months in and we're booked out two weeks ahead.",
    name: 'Kevin D.',
    business: 'Landscaping',
    location: 'Beverly, MA',
    stars: 5,
  },
]

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
    ))}
  </div>
)

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export const Testimonials = () => (
  <Section
    id="testimonials"
    eyebrow="Client Results"
    title={<>Real businesses. <span className="font-display-italic text-muted-foreground">Real results.</span></>}
    subtitle="Berkshire County and North Shore businesses that stopped losing jobs to whoever showed up first."
    align="center"
  >
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {testimonials.map(({ quote, name, business, location, stars }) => (
        <motion.div
          key={name}
          variants={card}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
          className="group glass-card rounded-xl p-7 flex flex-col gap-5 hover:border-border-strong hover:shadow-[4px_4px_0px_rgba(0,0,0,0.45)] transition-all duration-300 cursor-default relative overflow-hidden"
        >
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 0%, hsl(var(--accent)/0.05), transparent 70%)' }} />

          <Quote size={20} className="text-accent/30 relative" />

          <p className="text-[15px] leading-relaxed text-foreground/85 flex-1 relative">
            &ldquo;{quote}&rdquo;
          </p>

          <div className="relative">
            <Stars count={stars} />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-semibold">{name}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{business} · {location}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-8 text-[12px] text-muted-foreground/50 text-center"
    >
      Names abbreviated for privacy. Full case studies coming soon.
    </motion.p>
  </Section>
)
