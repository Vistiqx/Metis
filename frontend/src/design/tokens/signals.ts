export type SignalTone =
  | "anomaly"
  | "financial"
  | "core"
  | "confirmed"
  | "emerging";

export const signalTokens: Record<
  SignalTone,
  {
    badge: string;
    tag: string;
    dot: string;
    bar: string;
    glow: string;
    text: string;
    nodeFill: string;
    nodeStroke: string;
  }
> = {
  anomaly: {
    badge: "border-[#ff2d8f]/45 bg-[rgba(255,45,143,0.14)] text-[#ff8dc0]",
    tag: "border-[#ff2d8f]/40 bg-[rgba(255,45,143,0.12)] text-[#ff8dc0]",
    dot: "bg-[#ff2d8f]",
    bar: "bg-[#ff2d8f]",
    glow: "shadow-[0_0_18px_rgba(255,45,143,0.32)]",
    text: "text-[#ff8dc0]",
    nodeFill: "#FF2D8F",
    nodeStroke: "#FF8DC0",
  },
  financial: {
    badge: "border-[#ff7a18]/45 bg-[rgba(255,122,24,0.14)] text-[#ffb16d]",
    tag: "border-[#ff7a18]/40 bg-[rgba(255,122,24,0.12)] text-[#ffb16d]",
    dot: "bg-[#ff7a18]",
    bar: "bg-[#ff7a18]",
    glow: "shadow-[0_0_18px_rgba(255,122,24,0.32)]",
    text: "text-[#ffb16d]",
    nodeFill: "#FF7A18",
    nodeStroke: "#FFB16D",
  },
  core: {
    badge: "border-[#ffd400]/45 bg-[rgba(255,212,0,0.14)] text-[#ffe37a]",
    tag: "border-[#ffd400]/40 bg-[rgba(255,212,0,0.12)] text-[#ffe37a]",
    dot: "bg-[#ffd400]",
    bar: "bg-[#ffd400]",
    glow: "shadow-[0_0_18px_rgba(255,212,0,0.28)]",
    text: "text-[#ffe37a]",
    nodeFill: "#FFD400",
    nodeStroke: "#FFE37A",
  },
  confirmed: {
    badge: "border-[#f0cf70]/50 bg-[rgba(240,207,112,0.14)] text-[#fff2bf]",
    tag: "border-[#f0cf70]/40 bg-[rgba(240,207,112,0.12)] text-[#fff2bf]",
    dot: "bg-[#f0cf70]",
    bar: "bg-[#f0cf70]",
    glow: "shadow-[0_0_18px_rgba(240,207,112,0.28)]",
    text: "text-[#fff2bf]",
    nodeFill: "#F0CF70",
    nodeStroke: "#FFF2BF",
  },
  emerging: {
    badge: "border-[#3ec5cf]/45 bg-[rgba(62,197,207,0.14)] text-[#9ce8ed]",
    tag: "border-[#3ec5cf]/40 bg-[rgba(62,197,207,0.12)] text-[#9ce8ed]",
    dot: "bg-[#3ec5cf]",
    bar: "bg-[#3ec5cf]",
    glow: "shadow-[0_0_18px_rgba(62,197,207,0.3)]",
    text: "text-[#9ce8ed]",
    nodeFill: "#3EC5CF",
    nodeStroke: "#9CE8ED",
  },
};
