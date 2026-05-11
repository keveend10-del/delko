import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { PACKAGES, Package } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { ProposalInteractive } from './ProposalInteractive'
import { Check, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getClient(slug: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export default async function ProposalPage({
  params,
}: {
  params: { clientSlug: string }
}) {
  const client = await getClient(params.clientSlug)
  if (!client) notFound()

  const pkg = PACKAGES[client.package as Package]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[14px] font-semibold tracking-tight">Berk Growth Co.</span>
          </div>
          <span className="text-[12px] text-white/30 font-medium">Confidential Proposal</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-4">
            Prepared for
          </p>
          <h1 className="text-[40px] sm:text-[52px] font-bold tracking-tight leading-[1.05] mb-3">
            {client.business_name}
          </h1>
          <p className="text-[17px] text-white/50">
            Attn: {client.name} · {pkg.name} Plan Proposal
          </p>
        </div>

        {/* Scope */}
        <div className="mb-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-6">Scope of Work</h2>
          <div className="glass-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <div>
                <p className="font-bold text-[17px]">{pkg.name} Plan</p>
                <p className="text-white/40 text-[14px]">{pkg.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-[24px] font-bold text-accent">{formatCurrency(pkg.price)}</p>
                <p className="text-[12px] text-white/30">per month</p>
              </div>
            </div>
            <ul className="space-y-3">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px]">
                  <Check size={15} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
              {client.custom_scope && (
                <>
                  <li className="pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent mb-3">
                      Additional scope for {client.business_name}
                    </p>
                  </li>
                  {client.custom_scope.split('\n').filter(Boolean).map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]">
                      <ArrowRight size={15} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-white/80">{line.trim()}</span>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[13px] text-white/35">
                Ad spend is paid directly to Google/Meta by you. Not included in retainer.
              </p>
            </div>
          </div>
        </div>

        {/* All 3 packages */}
        <div className="mb-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-2">Available Plans</h2>
          <p className="text-white/40 text-[14px] mb-6">No contracts. Cancel month-to-month. No setup fees.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {(Object.entries(PACKAGES) as [Package, typeof PACKAGES[Package]][]).map(([key, p]) => {
              const isSelected = key === client.package
              return (
                <div
                  key={key}
                  className={`rounded-[12px] p-5 transition-all ${
                    isSelected
                      ? 'bg-[rgba(30,255,150,0.05)] border border-[rgba(30,255,150,0.2)]'
                      : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]'
                  }`}
                >
                  {isSelected && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-3">
                      Selected
                    </p>
                  )}
                  <p className="font-bold text-[16px]">{p.name}</p>
                  <p className="text-white/40 text-[12px] mb-3">{p.tagline}</p>
                  <p className="text-[20px] font-bold text-accent mb-4">
                    {formatCurrency(p.price)}<span className="text-[13px] font-normal text-white/30">/mo</span>
                  </p>
                  <ul className="space-y-2">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12px] text-white/50">
                        <Check size={12} className="text-accent mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {p.features.length > 3 && (
                      <li className="text-[12px] text-white/30">+{p.features.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mb-16">
          <h2 className="text-[22px] font-bold tracking-tight mb-2">ROI Projection</h2>
          <p className="text-white/40 text-[14px] mb-6">
            Adjust the inputs to see projected returns based on your numbers.
          </p>
          <div className="glass-card p-6 sm:p-8">
            <ProposalInteractive
              clientSlug={client.slug}
              pkg={client.package as Package}
              retainerFee={pkg.price}
              clientEmail={client.email}
              clientName={client.name}
              alreadySigned={!!client.signed_at}
            />
          </div>
        </div>

        {/* Terms */}
        <TermsSection />
      </div>
    </div>
  )
}

function TermsSection() {
  return (
    <div className="mb-16">
      <h2 className="text-[22px] font-bold tracking-tight mb-6">Terms of Service</h2>
      <div className="glass-card p-6 sm:p-8 space-y-5 text-[14px] text-white/55 leading-relaxed">
        {[
          ['1. Services', 'Berk Growth Co. ("Agency") agrees to provide the digital marketing services described in the selected package. Specific deliverables and timelines will be outlined in a kickoff document delivered within 7 business days of payment.'],
          ['2. Payment', 'Client agrees to pay the monthly retainer fee on a recurring basis. All payments are processed via Stripe. The first charge occurs upon subscription activation. Subsequent charges occur on the same day each month.'],
          ['3. Ad Spend', 'Ad spend for Google Ads, Google Local Services Ads, and Meta Ads is paid directly by the client to the respective platforms. Agency fees do not include ad spend. Agency will request budget authorization before launching any paid campaigns.'],
          ['4. Term & Cancellation', 'This agreement is month-to-month with no long-term commitment. Either party may cancel with 30 days written notice. Cancellation takes effect at the end of the current billing period. Partial months are non-refundable.'],
          ['5. Ownership', 'All creative assets, website code, and content produced by Agency under this agreement belong to the Client upon full payment. Login credentials and account access will be transferred within 7 days of cancellation.'],
          ['6. Confidentiality', 'Both parties agree to maintain confidentiality of any proprietary business information shared during the engagement. This obligation survives termination of the agreement.'],
          ['7. Results', 'Agency will make commercially reasonable efforts to achieve the projected outcomes. Digital marketing results are influenced by market conditions, seasonality, and platform algorithm changes outside Agency\'s control. Projections are estimates, not guarantees.'],
          ['8. Limitation of Liability', "Agency's total liability for any claim arising under this agreement shall not exceed the total fees paid by Client in the three months preceding the claim."],
          ['9. Governing Law', 'This agreement is governed by the laws of the Commonwealth of Massachusetts. Any disputes shall be resolved in Berkshire County, Massachusetts.'],
          ['10. Entire Agreement', 'This document constitutes the entire agreement between the parties and supersedes all prior discussions. Amendments must be in writing and agreed to by both parties.'],
        ].map(([title, body]) => (
          <div key={title as string}>
            <p className="font-semibold text-white/80 mb-1">{title}</p>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
