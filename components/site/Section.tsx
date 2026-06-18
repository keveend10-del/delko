import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
  bare?: boolean
  surface?: boolean
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const Section = ({
  id, eyebrow, title, subtitle, children,
  className = '', align = 'left', bare = false, surface = false,
}: SectionProps) => (
  <section id={id} className={`relative py-10 sm:py-16 ${surface ? 'bg-surface/50' : ''} ${className}`}>
    <div className="container mx-auto px-5 sm:px-8">
      {!bare && (eyebrow || title || subtitle) && (
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className={`max-w-3xl mb-8 ${align === 'center' ? 'mx-auto text-center' : ''}`}
        >
          {eyebrow && (
            <motion.div variants={fadeUp} className="eyebrow mb-6">{eyebrow}</motion.div>
          )}
          {title && (
            <motion.h2
              variants={fadeUp}
              className="text-[40px] sm:text-[58px] lg:text-[74px] font-bold leading-[1.0] tracking-[-0.04em]"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[17px] sm:text-[18px] text-muted-foreground leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  </section>
)

export const SectionDivider = () => (
  <div className="container mx-auto px-5 sm:px-8">
    <div className="hairline" />
  </div>
)
