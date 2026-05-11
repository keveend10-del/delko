import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  icon?: ReactNode
  accent?: boolean
}

export function MetricCard({ label, value, sub, trend, trendLabel, icon, accent }: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-red-400' : 'text-white/30'

  return (
    <Card variant={accent ? 'accent' : 'default'} className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40 mb-3">
            {label}
          </p>
          <p className={cn(
            'text-[28px] font-bold tracking-tight leading-none',
            accent ? 'text-accent' : 'text-white'
          )}>
            {value}
          </p>
          {sub && (
            <p className="text-[12px] text-white/40 mt-1.5">{sub}</p>
          )}
        </div>
        {icon && (
          <div className={cn(
            'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0',
            accent ? 'bg-accent/15 text-accent' : 'bg-[rgba(255,255,255,0.06)] text-white/50'
          )}>
            {icon}
          </div>
        )}
      </div>
      {trend && trendLabel && (
        <div className={cn('flex items-center gap-1.5 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]', trendColor)}>
          <TrendIcon size={13} />
          <span className="text-[12px] font-medium">{trendLabel}</span>
        </div>
      )}
    </Card>
  )
}
