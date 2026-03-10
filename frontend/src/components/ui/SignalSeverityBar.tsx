import { signalTokens, type SignalTone } from "../../design/tokens";
import { cn } from "../../utils/cn";

interface SignalSeverityBarProps {
  tone: SignalTone;
  className?: string;
}

export function SignalSeverityBar({ tone, className }: SignalSeverityBarProps) {
  return (
    <div
      className={cn(
        "mt-3 h-2 rounded-full border border-[rgba(110,138,189,0.18)] bg-[rgba(17,24,39,0.92)] p-[2px]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "h-full w-full rounded-full",
          signalTokens[tone].bar,
          signalTokens[tone].glow,
        )}
      />
    </div>
  );
}
