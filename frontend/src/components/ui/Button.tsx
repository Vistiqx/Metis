import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl border text-sm font-semibold tracking-[0.01em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary/60 bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/10',
        destructive: 'border-destructive/40 bg-destructive/90 text-destructive-foreground hover:bg-destructive',
        outline: 'border-border/80 bg-secondary/50 text-foreground hover:border-primary/45 hover:bg-secondary',
        secondary: 'border-border/70 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'border-transparent bg-transparent text-muted-foreground hover:border-border/60 hover:bg-accent/70 hover:text-foreground',
        link: 'border-transparent px-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  const accessibleLabel = typeof props['aria-label'] === 'string' ? props['aria-label'] : props.title

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {size === 'icon' && accessibleLabel && <span className="sr-only">{accessibleLabel}</span>}
    </button>
  )
}
