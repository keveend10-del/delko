import { motion } from 'framer-motion'
import { Section } from './Section'

const row1 = ['Pittsfield', 'Lenox', 'Stockbridge', 'Great Barrington', 'Lee', 'Williamstown', 'North Adams', 'Dalton', 'Adams']
const row2 = ['Marblehead', 'Salem', 'Gloucester', 'Beverly', 'Swampscott', 'Manchester-by-the-Sea', 'Rockport', 'Ipswich', 'Newburyport']

export const LocalFocus = () => (
  <Section
    id="local"
    eyebrow="Local"
    title={<>From the <span className="font-display-italic text-muted-foreground">Berkshires to the North Shore.</span></>}
    subtitle="We're not trying to be a giant agency. We work with local businesses we can actually drive out and meet — across Berkshire County and Massachusetts' North Shore."
  >
    <div className="space-y-3">
      {/* Row 1 — left to right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative -mx-5 sm:-mx-8 overflow-hidden mask-fade"
      >
        <div className="flex gap-3 marquee-track w-max py-1">
          {[...row1, ...row1].map((t, i) => (
            <span
              key={`r1-${t}-${i}`}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-[14px] font-medium whitespace-nowrap hover:border-accent/30 hover:text-foreground transition-colors cursor-default"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Row 2 — right to left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative -mx-5 sm:-mx-8 overflow-hidden mask-fade"
      >
        <div className="flex gap-3 marquee-track-reverse w-max py-1">
          {[...row2, ...row2].map((t, i) => (
            <span
              key={`r2-${t}-${i}`}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-[14px] font-medium whitespace-nowrap hover:border-accent/30 hover:text-foreground transition-colors cursor-default"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </Section>
)
