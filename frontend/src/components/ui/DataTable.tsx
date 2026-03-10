import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";

export function DataTable({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-border/80 bg-card/95", className)} {...props} />
  );
}

export function DataTableTable({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("metis-table", className)} {...props} />;
}

export function DataTableHeadCell({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("text-sm text-foreground", className)} {...props} />;
}
