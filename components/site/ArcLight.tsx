'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface ArcLightProps {
  radius?: number
  duration?: number
  delay?: number
}

export const ArcLight = ({ radius = 12, duration = 12, delay = 0 }: ArcLightProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px -5% 0px' })

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          width: 80,
          height: 3,
          background:
            'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4), hsl(var(--accent) / 0.8), white, hsl(var(--accent) / 0.8), hsl(var(--accent) / 0.4), transparent)',
          borderRadius: 9999,
          filter: 'blur(2px)',
          offsetPath: `inset(0px round ${radius}px)`,
          offsetDistance: '0%',
          animationName: 'arc-orbit',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${delay}s`,
          animationPlayState: inView ? 'running' : 'paused',
          zIndex: 10,
        } as React.CSSProperties}
      />
    </div>
  )
}
