import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("metis-panel text-card-foreground", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "font-authority text-xl leading-none tracking-tight text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("flex items-center p-5 pt-0 sm:p-6 sm:pt-0", className)}
      {...props}
    />
  );
}
