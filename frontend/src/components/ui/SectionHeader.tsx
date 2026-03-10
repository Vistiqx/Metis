import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  meta,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("metis-page-header", className)}>
      <div>
        {kicker ? <div className="metis-kicker">{kicker}</div> : null}
        <h1 className="metis-title">{title}</h1>
        {subtitle ? <p className="metis-subtitle">{subtitle}</p> : null}
      </div>
      {meta ? <div className="flex items-center gap-2">{meta}</div> : null}
    </div>
  );
}
