'use client'

import { useEffect, useRef } from 'react'

export function WelcomeEffect({ clientSlug }: { clientSlug: string }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    const key = `welcome_sent_${clientSlug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientSlug }),
    }).catch(() => {})
  }, [clientSlug])

  return null
}
