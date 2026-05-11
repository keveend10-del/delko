'use client'

import { useState } from 'react'
import { ROICalculator } from '@/components/proposal/ROICalculator'
import { SignatureForm } from '@/components/proposal/SignatureForm'
import { StripePayment } from '@/components/proposal/StripePayment'
import { Package } from '@/lib/types'
import { CheckCircle } from 'lucide-react'

interface Props {
  clientSlug: string
  pkg: Package
  retainerFee: number
  clientEmail: string
  clientName: string
  alreadySigned: boolean
}

export function ProposalInteractive({
  clientSlug,
  pkg,
  retainerFee,
  clientEmail,
  clientName,
  alreadySigned,
}: Props) {
  const [hasSigned, setHasSigned] = useState(alreadySigned)

  return (
    <div className="space-y-10">
      <ROICalculator retainerFee={retainerFee} />

      <div className="border-t border-[rgba(255,255,255,0.06)] pt-10 space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
            {hasSigned ? 'Step 1 — Complete' : 'Step 1 of 2'}
          </p>
          <h2 className="text-[22px] font-bold tracking-tight">
            {hasSigned ? 'Agreement Signed' : 'Sign the Agreement'}
          </h2>
        </div>

        {hasSigned ? (
          <div className="flex items-center gap-3 rounded-[12px] bg-[rgba(30,255,150,0.06)] border border-[rgba(30,255,150,0.2)] px-5 py-4">
            <CheckCircle size={18} className="text-accent shrink-0" />
            <p className="text-[14px] text-white/80">
              Agreement signed. Complete your subscription below to get started.
            </p>
          </div>
        ) : (
          <SignatureForm clientSlug={clientSlug} onSigned={() => setHasSigned(true)} />
        )}
      </div>

      {hasSigned && (
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
              Step 2 of 2
            </p>
            <h2 className="text-[22px] font-bold tracking-tight">Start Your Subscription</h2>
          </div>
          <StripePayment
            clientSlug={clientSlug}
            pkg={pkg}
            clientEmail={clientEmail}
            clientName={clientName}
          />
        </div>
      )}
    </div>
  )
}
