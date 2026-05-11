import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'elevated'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[12px] transition-all',
        {
          'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]':
            variant === 'default',
          'bg-[rgba(30,255,150,0.05)] border border-[rgba(30,255,150,0.15)]':
            variant === 'accent',
          'bg-elevated border border-[rgba(255,255,255,0.08)]':
            variant === 'elevated',
        },
        className
      )}
      {...props}
    />
  )
}
