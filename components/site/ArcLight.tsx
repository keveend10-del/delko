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

  const playState = inView ? 'running' : 'paused'

  const base = {
    position: 'absolute',
    offsetPath: `inset(0px round ${radius}px)`,
    offsetDistance: '0%',
    animationName: 'arc-orbit',
    animationDuration: `${duration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDelay: `${delay}s`,
    animationPlayState: playState,
  } as React.CSSProperties

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden isolate"
      aria-hidden="true"
    >
      {/* Trail: right edge anchored to path point, fades left → bright right */}
      <div
        style={{
          ...base,
          width: 100,
          height: 2,
          background:
            'linear-gradient(to right, transparent 0%, hsl(var(--accent)/0.04) 15%, hsl(var(--accent)/0.18) 38%, hsl(var(--accent)/0.55) 62%, hsl(var(--accent)/0.88) 84%, white 100%)',
          borderRadius: 9999,
          filter: 'blur(1.5px)',
          offsetAnchor: '100% 50%',
          zIndex: 10,
        } as React.CSSProperties}
      />
      {/* Head: bright dot centered on path point */}
      <div
        style={{
          ...base,
          width: 5,
          height: 5,
          background: 'white',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          boxShadow:
            '0 0 6px 2px hsl(var(--accent)/0.9), 0 0 14px 5px hsl(var(--accent)/0.4)',
          offsetAnchor: '50% 50%',
          zIndex: 11,
        } as React.CSSProperties}
      />
    </div>
  )
}
