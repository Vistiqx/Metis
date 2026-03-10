import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        neutral: "border-border/80 bg-secondary/60 text-muted-foreground",
        gold: "border-primary/30 bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface TagProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...props} />
  );
}
