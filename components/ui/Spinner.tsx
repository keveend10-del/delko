import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 size={24} className="animate-spin text-accent" />
    </div>
  )
}

export function PageSpinner() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <Spinner />
    </div>
  )
}
