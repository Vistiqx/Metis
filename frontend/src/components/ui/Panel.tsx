import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export function Panel({ className, inset = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        inset
          ? "rounded-xl border border-border/70 bg-input/70"
          : "rounded-xl border border-border/80 bg-card/90 shadow-panel shadow-black/25 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
