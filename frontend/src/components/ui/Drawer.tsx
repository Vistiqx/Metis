import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {}

export function Drawer({ className, ...props }: DrawerProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-card/90 shadow-panel shadow-black/25 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
