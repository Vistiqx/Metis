import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export function Panel({ className, inset = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        inset ? "metis-panel-muted" : "metis-panel",
        className,
      )}
      {...props}
    />
  );
}
