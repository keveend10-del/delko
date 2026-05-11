'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckSquare, Square, PenLine } from 'lucide-react'

interface SignatureFormProps {
  clientSlug: string
  onSigned: () => void
}

export function SignatureForm({ clientSlug, onSigned }: SignatureFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [signerName, setSignerName] = useState('')
  const [signerDate, setSignerDate] = useState(
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = agreed && signerName.trim().length > 2 && signerDate.trim().length > 0

  async function handleSign() {
    if (!canSubmit) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/save-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientSlug, signerName: signerName.trim(), signerDate }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to save signature')
      }
      onSigned()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card variant="accent" className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <PenLine size={20} className="text-accent" />
        <h3 className="text-[18px] font-bold tracking-tight">Sign & Continue</h3>
      </div>

      <button
        onClick={() => setAgreed((v) => !v)}
        className="flex items-start gap-3 text-left w-full group"
      >
        <div className="mt-0.5 shrink-0 text-accent">
          {agreed ? <CheckSquare size={20} /> : <Square size={20} className="text-white/30" />}
        </div>
        <span className="text-[14px] text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
          I have read and agree to the terms of service above. I authorize Berk Growth Co. to begin work under the selected package and understand that payment will be charged monthly.
        </span>
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full name (signature)"
          placeholder="Type your full legal name"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
        />
        <Input
          label="Today's date"
          placeholder="e.g. January 15, 2025"
          value={signerDate}
          onChange={(e) => setSignerDate(e.target.value)}
        />
      </div>

      {signerName && (
        <div className="rounded-[12px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-5 py-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/30 mb-2">Signature preview</p>
          <p
            className="text-[22px] text-white/80"
            style={{ fontFamily: "'Segoe Script', 'Bradley Hand', cursive" }}
          >
            {signerName}
          </p>
          <p className="text-[12px] text-white/30 mt-1">{signerDate}</p>
        </div>
      )}

      {error && <p className="text-[13px] text-red-400">{error}</p>}

      <Button
        onClick={handleSign}
        disabled={!canSubmit}
        loading={loading}
        size="lg"
        className="w-full"
      >
        Sign & Continue to Payment
      </Button>

      <p className="text-[12px] text-white/25 text-center">
        Electronically signed agreements are legally binding under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act).
      </p>
    </Card>
  )
}
