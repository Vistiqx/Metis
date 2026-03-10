import type { HTMLAttributes } from "react";
import { signalTokens, type SignalTone } from "../../design/tokens";
import { cn } from "../../utils/cn";

interface SignalTagProps extends HTMLAttributes<HTMLSpanElement> {
  tone: SignalTone;
}

export function SignalTag({ tone, className, ...props }: SignalTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]",
        signalTokens[tone].tag,
        className,
      )}
      {...props}
    />
  );
}
