import { signalTokens, type SignalTone } from "../../design/tokens";

interface SignalNodeProps {
  tone: SignalTone;
  selected?: boolean;
}

export function SignalNode({ tone, selected = false }: SignalNodeProps) {
  const token = signalTokens[tone];

  return (
    <circle
      r="25"
      fill={token.nodeFill}
      fillOpacity="0.9"
      stroke={selected ? token.nodeStroke : "rgba(15, 23, 42, 0.8)"}
      strokeWidth={selected ? "4" : "2"}
    />
  );
}
