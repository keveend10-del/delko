'use client'

import { useEffect, useRef } from 'react'
import { trackScrollMilestone } from '@/lib/analytics'

const MILESTONES = [25, 50, 75, 100]

export function useScrollDepth() {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((window.scrollY / total) * 100)
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m)
          trackScrollMilestone(m)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
