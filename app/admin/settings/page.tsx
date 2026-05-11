'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAdminAuth } from '@/contexts/AdminAuth'
import { PageHeader, Panel, inputCls } from '@/components/admin/ui'
import { PIPELINE_STAGES, NORTH_SHORE_TOWNS, BUSINESS_TYPES, PACKAGES } from '@/lib/admin-constants'
import { toast } from 'sonner'

export default function Settings() {
  const supabase = createClient()
  const { user } = useAdminAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle().then(({ data }) => setProfile(data))
  }, [user])

  const saveProfile = async () => {
    if (!profile) return
    const { error } = await supabase.from('profiles').update({ full_name: profile.full_name }).eq('id', profile.id)
    if (error) toast.error(error.message)
    else toast.success('Profile saved')
  }

  return (
    <div>
      <PageHeader eyebrow="Workspace" title="Studio settings" description="Configure your admin profile and reference data." />

      <div className="grid lg:grid-cols-2 gap-4">
        <Panel className="p-6">
          <SectionTitle>Admin profile</SectionTitle>
          <div className="space-y-3 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Email</label>
              <input value={user?.email ?? ''} disabled className={inputCls + ' opacity-50'} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Full name</label>
              <input
                value={profile?.full_name ?? ''}
                onChange={e => setProfile((p: any) => ({ ...p, full_name: e.target.value }))}
                className={inputCls}
              />
            </div>
            <button onClick={saveProfile} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all">
              Save profile
            </button>
          </div>
        </Panel>

        <Panel className="p-6">
          <SectionTitle>Business info</SectionTitle>
          <p className="mt-3 text-sm text-muted-foreground">Berk Growth Co. · Serving Berkshires + North Shore, MA businesses.</p>
        </Panel>

        <RefList title="Pipeline stages" items={PIPELINE_STAGES} />
        <RefList title="Packages" items={PACKAGES} />
        <RefList title="Towns" items={NORTH_SHORE_TOWNS} />
        <RefList title="Business types" items={BUSINESS_TYPES} />
      </div>
    </div>
  )
}

const SectionTitle = ({ children }: any) => (
  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{children}</h3>
)
const RefList = ({ title, items }: { title: string; items: string[] }) => (
  <Panel className="p-6">
    <SectionTitle>{title}</SectionTitle>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map(i => (
        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-muted-foreground">{i}</span>
      ))}
    </div>
    <p className="mt-3 text-[11px] text-muted-foreground">Editable lists coming soon. For now, edit constants in <code className="text-foreground">lib/admin-constants.ts</code>.</p>
  </Panel>
)
