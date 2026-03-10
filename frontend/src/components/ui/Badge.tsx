import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva("metis-badge", {
  variants: {
    variant: {
      neutral:
        "border-[rgba(156,120,70,0.24)] bg-[rgba(31,21,21,0.82)] text-[#eadfca] shadow-[inset_0_1px_0_rgba(255,240,177,0.02)]",
      gold:
        "border-[rgba(212,175,55,0.34)] bg-[linear-gradient(180deg,rgba(82,58,14,0.9),rgba(42,31,11,0.95))] text-[#f2d883] shadow-[inset_0_1px_0_rgba(255,240,177,0.18),0_0_0_1px_rgba(130,95,20,0.22)]",
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
  neutral: "bg-[#c39a5a]",
  gold: "bg-[#f0cf70]",
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
