import type { HTMLAttributes } from "react";
import { signalTokens, type SignalTone } from "../../design/tokens";
import { cn } from "../../utils/cn";

interface SignalIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  tone: SignalTone;
  label: string;
}

export function SignalIndicator({
  tone,
  label,
  className,
  ...props
}: SignalIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground",
        className,
      )}
      {...props}
    >
      <span
        className={cn("h-2 w-2 rounded-full", signalTokens[tone].dot)}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
