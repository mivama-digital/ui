import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small" | "lead"
}

export function Typography({
  variant = "p",
  className,
  ...props
}: TypographyProps) {
  const Component: React.ElementType =
    variant === "h1" || variant === "h2" || variant === "h3" || variant === "h4"
      ? variant
      : "p"
  return (
    <Component
      className={cn(
        {
          h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
          h2: "text-3xl font-bold tracking-tight lg:text-4xl",
          h3: "text-2xl font-semibold tracking-tight",
          h4: "text-xl font-semibold tracking-tight",
          p: "text-base leading-7 [&:not(:first-child)]:mt-6",
          lead: "text-base leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground",
          small: "text-sm leading-6 text-muted-foreground",
        }[variant],
        className
      )}
      {...props}
    />
  )
}
