import { signalTokens, type SignalTone } from "../../design/tokens";

interface SignalNodeProps {
  tone: SignalTone;
  selected?: boolean;
}

export function SignalNode({ tone, selected = false }: SignalNodeProps) {
  const token = signalTokens[tone];

  return (
    <>
      <circle r="31" fill={token.nodeFill} fillOpacity={selected ? "0.14" : "0.08"} />
      <circle
        r="25"
        fill={token.nodeFill}
        fillOpacity="0.92"
        stroke={selected ? token.nodeStroke : "rgba(255, 240, 177, 0.16)"}
        strokeWidth={selected ? "4" : "2"}
      />
      <circle r="10" fill="rgba(255,255,255,0.18)" />
    </>
  );
}
