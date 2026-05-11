'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[hsl(0_0%_6%)] border-l border-border h-full overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        <div className="sticky top-0 z-10 bg-[hsl(0_0%_6%)] border-b border-border px-6 py-4 flex items-center justify-between">
          {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
          <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
