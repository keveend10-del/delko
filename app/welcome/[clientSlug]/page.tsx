import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { PACKAGES, Package } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { WelcomeEffect } from './WelcomeEffect'
import { CheckCircle, Mail, Calendar, LayoutDashboard } from 'lucide-react'

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
            <span className="text-[14px] font-semibold tracking-tight">Berk Growth Co.</span>
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
              Welcome to Berk Growth Co. Your {pkg.name} plan for{' '}
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
                body: `We sent onboarding details to ${client.email} — account access, kickoff prep, and what to expect in the first 30 days.`,
              },
              {
                icon: Calendar,
                step: '02',
                title: 'Kickoff call within 48 hours',
                body: "Keveen or Jack will reach out to schedule your kickoff. We'll align on goals, gather assets, and lock in your first-month plan.",
              },
              {
                icon: LayoutDashboard,
                step: '03',
                title: 'Your dashboard is live',
                body: 'Track leads, reviews, ad spend, and monthly performance reports — all in one place. Bookmark the link below.',
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

          {/* CTA */}
          <div className="text-center">
            <a
              href={`/dashboard/${client.slug}`}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[10px] bg-accent text-[#0A0A0A] font-semibold text-[14px] hover:bg-[rgba(30,255,150,0.85)] transition-colors"
            >
              <LayoutDashboard size={15} />
              Go to your dashboard
            </a>
          </div>

          <p className="text-center text-[12px] text-white/25">
            Questions? Email us at{' '}
            <a href="mailto:hello@berkgrowth.co" className="text-accent hover:underline">
              hello@berkgrowth.co
            </a>
          </p>
        </div>
      </div>

      <WelcomeEffect clientSlug={client.slug} />
    </div>
  )
}
