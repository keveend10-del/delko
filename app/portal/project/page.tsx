'use client'

import { useEffect, useState } from 'react'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { createClient } from '@/lib/supabase/client'
import { Panel, PageHeader, StatusBadge } from '@/components/admin/ui'
import { PACKAGES, type Package } from '@/lib/types'
import { FolderKanban, CheckCircle, Circle } from 'lucide-react'

interface Project {
  id: string
  project_name: string
  status: string
  progress: number
  current_phase?: string
  notes?: string
  timeline?: string
}

export default function ProjectPage() {
  const { client } = usePortalAuth()
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!client) return
    supabase
      .from('projects')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects(data ?? [])
        setLoading(false)
      })
  }, [client?.id])

  if (!client) return null
  const pkg = PACKAGES[client.package as Package]

  return (
    <div>
      <PageHeader
        eyebrow="Your work"
        title="Project status"
        description="See what we're building, where things stand, and what's coming next."
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <Panel key={i} className="p-6 animate-pulse">
              <div className="h-5 w-48 bg-surface-elevated rounded mb-4" />
              <div className="h-2 w-full bg-surface-elevated rounded" />
            </Panel>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Panel className="p-12 text-center">
          <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mx-auto mb-4">
            <FolderKanban size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground/70 mb-1">Projects launching soon</p>
          <p className="text-[12px] text-muted-foreground max-w-sm mx-auto">
            Your project workspace will be set up after your kickoff call. Check back here once we&apos;ve aligned on your first-month plan.
          </p>
        </Panel>
      ) : (
        <div className="space-y-5">
          {projects.map(project => (
            <Panel key={project.id} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{pkg.name} Plan</p>
                  <h2 className="text-lg font-bold tracking-tight">{project.project_name}</h2>
                  {project.current_phase && (
                    <p className="text-[13px] text-muted-foreground mt-1">Phase: {project.current_phase}</p>
                  )}
                </div>
                <StatusBadge value={project.status} />
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Progress</span>
                  <span className="text-[13px] font-bold text-accent tabular-nums">{project.progress ?? 0}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${project.progress ?? 0}%` }}
                  />
                </div>
              </div>

              {/* Phase indicators */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {['Setup', 'Build', 'Launch', 'Optimize'].map((phase, i) => {
                  const pct = project.progress ?? 0
                  const thresholds = [0, 25, 60, 90]
                  const done = pct >= thresholds[i] + 25
                  const active = pct >= thresholds[i] && pct < (thresholds[i + 1] ?? 100)
                  return (
                    <div key={phase} className={`rounded-xl border px-3 py-2.5 text-center transition-colors ${
                      done ? 'border-accent/25 bg-accent/8'
                      : active ? 'border-accent/40 bg-accent/12'
                      : 'border-border bg-surface'
                    }`}>
                      <div className="flex justify-center mb-1">
                        {done
                          ? <CheckCircle size={13} className="text-accent" />
                          : active
                          ? <div className="h-3 w-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                          : <Circle size={13} className="text-muted-foreground" />}
                      </div>
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${done || active ? 'text-accent' : 'text-muted-foreground'}`}>
                        {phase}
                      </p>
                    </div>
                  )
                })}
              </div>

              {project.timeline && (
                <div className="rounded-xl bg-surface border border-border px-4 py-3 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Timeline</p>
                  <p className="text-[13px] text-foreground/80">{project.timeline}</p>
                </div>
              )}

              {project.notes && (
                <div className="rounded-xl bg-surface border border-border px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Notes from Delko</p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed whitespace-pre-line">{project.notes}</p>
                </div>
              )}
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}
