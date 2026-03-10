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
    nodeFill: string;
    nodeStroke: string;
  }
> = {
  anomaly: {
    badge: "border-[#ff2d8f]/35 bg-[#ff2d8f]/10 text-[#ff8dc0]",
    tag: "border-[#ff2d8f]/30 bg-[#ff2d8f]/10 text-[#ff8dc0]",
    dot: "bg-[#ff2d8f]",
    bar: "bg-[#ff2d8f]",
    nodeFill: "#FF2D8F",
    nodeStroke: "#FF8DC0",
  },
  financial: {
    badge: "border-[#ff7a18]/35 bg-[#ff7a18]/10 text-[#ffb16d]",
    tag: "border-[#ff7a18]/30 bg-[#ff7a18]/10 text-[#ffb16d]",
    dot: "bg-[#ff7a18]",
    bar: "bg-[#ff7a18]",
    nodeFill: "#FF7A18",
    nodeStroke: "#FFB16D",
  },
  core: {
    badge: "border-[#ffd400]/35 bg-[#ffd400]/10 text-[#ffe37a]",
    tag: "border-[#ffd400]/30 bg-[#ffd400]/10 text-[#ffe37a]",
    dot: "bg-[#ffd400]",
    bar: "bg-[#ffd400]",
    nodeFill: "#FFD400",
    nodeStroke: "#FFE37A",
  },
  confirmed: {
    badge: "border-[#32d1cc]/35 bg-[#32d1cc]/10 text-[#89e7e3]",
    tag: "border-[#32d1cc]/30 bg-[#32d1cc]/10 text-[#89e7e3]",
    dot: "bg-[#32d1cc]",
    bar: "bg-[#32d1cc]",
    nodeFill: "#32D1CC",
    nodeStroke: "#89E7E3",
  },
  emerging: {
    badge: "border-[#a6ff00]/35 bg-[#a6ff00]/10 text-[#d5ff7b]",
    tag: "border-[#a6ff00]/30 bg-[#a6ff00]/10 text-[#d5ff7b]",
    dot: "bg-[#a6ff00]",
    bar: "bg-[#a6ff00]",
    nodeFill: "#A6FF00",
    nodeStroke: "#D5FF7B",
  },
};
