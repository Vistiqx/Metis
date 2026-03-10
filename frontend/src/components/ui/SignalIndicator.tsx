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
        "inline-flex items-center gap-2 rounded-md border border-[rgba(110,138,189,0.16)] bg-[rgba(11,17,28,0.52)] px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          signalTokens[tone].dot,
          signalTokens[tone].glow,
        )}
        aria-hidden="true"
      />
      <span className={signalTokens[tone].text}>{label}</span>
    </span>
  );
}
