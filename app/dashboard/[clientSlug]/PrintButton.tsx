'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 h-8 px-3 rounded-[8px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.09)] transition-colors"
    >
      <Printer size={13} />
      Export PDF
    </button>
  )
}
