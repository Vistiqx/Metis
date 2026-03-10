import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva("metis-badge", {
  variants: {
    variant: {
      neutral: "border-border/80 bg-secondary/70 text-secondary-foreground",
      gold: "border-primary/30 bg-primary/10 text-primary",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const dotClasses = {
  neutral: "bg-muted-foreground",
  gold: "bg-primary",
} as const;

export function Badge({
  className,
  variant = "neutral",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("metis-dot", dotClasses[variant ?? "neutral"])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
