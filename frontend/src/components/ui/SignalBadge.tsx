import type { HTMLAttributes } from "react";
import { signalTokens, type SignalTone } from "../../design/tokens";
import { cn } from "../../utils/cn";

interface SignalBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone: SignalTone;
  dot?: boolean;
}

export function SignalBadge({
  tone,
  dot = false,
  className,
  children,
  ...props
}: SignalBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        signalTokens[tone].badge,
        signalTokens[tone].glow,
        className,
      )}
      {...props}
    >
      {dot ? (
        <span
          className={cn("h-2 w-2 rounded-full", signalTokens[tone].dot)}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </span>
  );
}
