'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

interface ROICalculatorProps {
  retainerFee: number
}

export function ROICalculator({ retainerFee }: ROICalculatorProps) {
  const [avgJobValue, setAvgJobValue] = useState(2500)
  const [newLeadsPerMonth, setNewLeadsPerMonth] = useState(15)

  const breakEvenJobs = Math.ceil(retainerFee / avgJobValue)
  const monthlyRevenue = newLeadsPerMonth * avgJobValue
  const monthlyNet = monthlyRevenue - retainerFee
  const threeMonthNet = monthlyNet * 3
  const sixMonthNet = monthlyNet * 6
  const roiPercent = Math.round((monthlyNet / retainerFee) * 100)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-white/60">Average value of one job</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-[14px]">$</span>
            <input
              type="number"
              value={avgJobValue}
              onChange={(e) => setAvgJobValue(Math.max(1, parseInt(e.target.value) || 0))}
              className="h-11 w-full rounded-[12px] bg-elevated border border-[rgba(255,255,255,0.08)] pl-8 pr-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-medium text-white/60">Estimated new leads/month from our work</label>
          <input
            type="number"
            value={newLeadsPerMonth}
            onChange={(e) => setNewLeadsPerMonth(Math.max(1, parseInt(e.target.value) || 0))}
            className="h-11 w-full rounded-[12px] bg-elevated border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
          />
          <p className="text-[11px] text-white/30">Most clients see 10–25 new leads/month</p>
        </div>
      </div>

      <div className="rounded-[12px] bg-elevated border border-[rgba(255,255,255,0.08)] px-4 py-3 flex items-center justify-between">
        <span className="text-[13px] text-white/50">Monthly retainer</span>
        <span className="text-[14px] font-semibold text-white/70">{formatCurrency(retainerFee)}/mo</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="elevated" className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40 mb-2">
            Break-even
          </p>
          <p className="text-[28px] font-bold text-white tracking-tight">{breakEvenJobs}</p>
          <p className="text-[12px] text-white/40 mt-1">jobs/month to cover retainer</p>
        </Card>

        <Card variant="accent" className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} className="text-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              3-month ROI
            </p>
          </div>
          <p className="text-[28px] font-bold text-white tracking-tight">
            {formatCurrency(Math.max(0, threeMonthNet))}
          </p>
          <p className="text-[12px] text-white/40 mt-1">
            net gain ({roiPercent > 0 ? `+${roiPercent}%` : `${roiPercent}%`}/mo)
          </p>
        </Card>

        <Card variant="accent" className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} className="text-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              6-month ROI
            </p>
          </div>
          <p className="text-[28px] font-bold text-white tracking-tight">
            {formatCurrency(Math.max(0, sixMonthNet))}
          </p>
          <p className="text-[12px] text-white/40 mt-1">
            net gain at current pace
          </p>
        </Card>
      </div>

      <p className="text-[12px] text-white/25 leading-relaxed">
        Projections assume {newLeadsPerMonth} new leads/month from our work at {formatCurrency(avgJobValue)} average job value. Results vary by market and seasonal factors. We track actuals monthly.
      </p>
    </div>
  )
}
