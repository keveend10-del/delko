'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

export function Dialog({ open, onClose, title, children, maxWidth = 'max-w-2xl' }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; maxWidth?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-[hsl(0_0%_7%)] border border-border rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
