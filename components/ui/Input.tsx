import { cn } from '@/lib/utils'
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-white/60">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-[12px] bg-elevated border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white placeholder:text-white/25 outline-none transition-all',
            'focus:border-accent/50 focus:ring-2 focus:ring-accent/10',
            error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10',
            className
          )}
          {...props}
        />
        {error && <p className="text-[12px] text-red-400">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-white/60">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-[12px] bg-elevated border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none transition-all resize-none',
            'focus:border-accent/50 focus:ring-2 focus:ring-accent/10',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-[12px] text-red-400">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
