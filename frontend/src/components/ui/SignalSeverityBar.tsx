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
        "mt-3 h-1.5 rounded-full",
        signalTokens[tone].bar,
        className,
      )}
      aria-hidden="true"
    />
  );
}
