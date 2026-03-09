import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva('metis-badge', {
  variants: {
    variant: {
      neutral: 'border-border/80 bg-secondary/70 text-secondary-foreground',
      gold: 'border-primary/30 bg-primary/10 text-primary',
      success: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
      warning: 'border-amber-500/25 bg-amber-500/10 text-amber-200',
      danger: 'border-rose-500/25 bg-rose-500/10 text-rose-200',
      info: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-200',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
})

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const dotClasses = {
  neutral: 'bg-slate-400',
  gold: 'bg-primary',
  success: 'bg-emerald-400',
  warning: 'bg-amber-300',
  danger: 'bg-rose-300',
  info: 'bg-cyan-300',
} as const

export function Badge({ className, variant = 'neutral', dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className={cn('metis-dot', dotClasses[variant ?? 'neutral'])} aria-hidden="true" />}
      {children}
    </span>
  )
}
