import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'ghost' | 'outline' | 'destructive' | 'glass'
  size?: 'sm' | 'default' | 'md' | 'lg' | 'xl'
  loading?: boolean
  asChild?: boolean
}

const variantCls = (variant: ButtonProps['variant'], size: ButtonProps['size']) =>
  cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[12px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
    {
      'bg-accent text-[#0A0A0A] hover:brightness-105 active:scale-[0.98] shadow-glow-sm': variant === 'accent',
      'relative bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-[28px] border border-white/10 text-white/90 hover:border-white/20 hover:bg-white/10': variant === 'glass',
      'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]': variant === 'ghost',
      'bg-transparent border border-white/[0.12] text-white hover:border-white/[0.24] hover:bg-white/[0.04]': variant === 'outline',
      'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20': variant === 'destructive',
      'h-8 px-3 text-[12px]': size === 'sm',
      'h-10 px-4 text-[13px]': size === 'default',
      'h-10 px-5 text-[14px]': size === 'md',
      'h-11 px-6 text-[14px]': size === 'lg',
      'h-12 px-7 text-[15px] rounded-[14px]': size === 'xl',
    }
  )

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'accent', size = 'md', loading, disabled, asChild = false, children, ...props }, ref) => {
    const cls = cn(variantCls(variant, size), className)

    if (asChild) {
      return (
        <Slot ref={ref} className={cls} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <button ref={ref} disabled={disabled || loading} className={cls} {...props}>
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
