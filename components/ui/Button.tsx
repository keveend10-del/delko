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
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
    {
      'bg-accent text-white hover:brightness-110 active:scale-[0.97] shadow-[0_0_0_1px_hsl(var(--accent)/0.4),0_4px_20px_hsl(var(--accent)/0.25)]': variant === 'accent',
      'bg-transparent backdrop-blur-[16px] border border-foreground/[0.12] text-foreground/80 hover:border-foreground/[0.22] hover:text-foreground hover:bg-foreground/[0.05]': variant === 'glass',
      'bg-transparent text-foreground/55 hover:text-foreground hover:bg-foreground/[0.06] border border-border': variant === 'ghost',
      'bg-transparent border border-border text-foreground hover:border-border-strong hover:bg-foreground/[0.04]': variant === 'outline',
      'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20': variant === 'destructive',
      'h-8 px-3 text-[12px]': size === 'sm',
      'h-10 px-4 text-[13px]': size === 'default',
      'h-10 px-5 text-[14px]': size === 'md',
      'h-11 px-6 text-[14px]': size === 'lg',
      'h-12 px-7 text-[15px] rounded-[12px]': size === 'xl',
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
