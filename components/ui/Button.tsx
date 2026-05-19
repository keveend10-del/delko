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
      'bg-accent text-white hover:brightness-110 active:scale-[0.97] shadow-[0_0_0_1px_hsl(152_80%_38%/0.5),0_4px_20px_hsl(152_80%_38%/0.3)]': variant === 'accent',
      'bg-transparent backdrop-blur-[16px] border border-white/[0.09] text-white/80 hover:border-white/[0.16] hover:text-white hover:bg-white/[0.05]': variant === 'glass',
      'bg-transparent text-white/55 hover:text-white hover:bg-white/[0.05] border border-white/[0.07]': variant === 'ghost',
      'bg-transparent border border-white/[0.10] text-white hover:border-white/[0.20] hover:bg-white/[0.03]': variant === 'outline',
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
