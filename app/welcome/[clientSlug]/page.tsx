import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { PACKAGES, Package } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { WelcomeEffect } from './WelcomeEffect'
import { CheckCircle, Mail, Calendar, Lock, LayoutDashboard } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getClient(slug: string) {
  const supabase = createAdminClient()
  const { data } = await supabase.from('clients').select('*').eq('slug', slug).single()
  return data
}

export default async function WelcomePage({
  params,
}: {
  params: { clientSlug: string }
}) {
  const client = await getClient(params.clientSlug)
  if (!client) notFound()

  const pkg = PACKAGES[client.package as Package]
  const firstName = client.name.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[14px] font-semibold tracking-tight">Delko</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-16">
        <div className="max-w-2xl w-full space-y-10">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(30,255,150,0.1)] border border-[rgba(30,255,150,0.2)] mb-2">
              <CheckCircle size={28} className="text-accent" />
            </div>
            <h1 className="text-[36px] sm:text-[44px] font-bold tracking-tight leading-[1.1]">
              You&apos;re in, {firstName}.
            </h1>
            <p className="text-[17px] text-white/50 max-w-md mx-auto leading-relaxed">
              Welcome to Delko. Your {pkg.name} plan for{' '}
              <span className="text-white/80">{client.business_name}</span> is active at{' '}
              {formatCurrency(pkg.price)}/mo.
            </p>
          </div>

          {/* Next steps */}
          <div className="space-y-3">
            {[
              {
                icon: Mail,
                step: '01',
                title: 'Check your inbox',
                body: `We sent a confirmation to ${client.email}. You'll hear from us within a few hours with onboarding next steps.`,
              },
              {
                icon: Calendar,
                step: '02',
                title: 'Kickoff call within 48 hours',
                body: "We'll reach out to schedule your kickoff call — where we align on goals, gather assets, and lock in your first-month plan.",
              },
              {
                icon: Lock,
                step: '03',
                title: 'Client portal access within 24 hours',
                body: "We'll set up your client portal account and send you a login link. You'll be able to track onboarding, project progress, billing, and monthly reports.",
              },
            ].map(({ icon: Icon, step, title, body }) => (
              <div
                key={step}
                className="flex gap-4 rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5"
              >
                <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-bold text-accent/50 tracking-widest">{step}</span>
                  <div className="w-8 h-8 rounded-[8px] bg-[rgba(30,255,150,0.08)] border border-[rgba(30,255,150,0.15)] flex items-center justify-center">
                    <Icon size={15} className="text-accent" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[15px] mb-1">{title}</p>
                  <p className="text-[13px] text-white/50 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Portal preview CTA */}
          <div className="rounded-2xl bg-[rgba(30,255,150,0.04)] border border-[rgba(30,255,150,0.15)] p-6 text-center space-y-3">
            <p className="text-[13px] text-white/60 leading-relaxed">
              Once your portal is ready, you can track everything at:
            </p>
            <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.05)] rounded-lg px-4 py-2 font-mono text-[13px] text-accent border border-[rgba(30,255,150,0.1)]">
              <LayoutDashboard size={13} />
              delko.co/portal
            </div>
          </div>

          <p className="text-center text-[12px] text-white/25">
            Questions? Email us at{' '}
            <a href="mailto:hello@delko.co" className="text-accent hover:underline">
              hello@delko.co
            </a>
          </p>
        </div>
      </div>

      <WelcomeEffect clientSlug={client.slug} />
    </div>
  )
}
