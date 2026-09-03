import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils.js"

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm text-card-foreground ring-1 ring-border [--card-spacing:var(--panel-padding)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=lg]:[--card-spacing:--spacing(6)] sm:data-[size=lg]:[--card-spacing:--spacing(8)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        surface: "bg-card",
        subtle: "bg-surface",
        outline: "bg-transparent ring-border-strong",
        instrument:
          "bg-instrument text-instrument-foreground ring-instrument-border",
        interactive:
          "bg-card transition-[background-color,box-shadow] duration-(--motion-duration-fast) ease-(--motion-easing-standard) hover:bg-surface-elevated hover:ring-border-strong hover:shadow-(--shadow-subtle) focus-within:bg-surface-elevated focus-within:ring-border-strong focus-within:shadow-(--shadow-subtle) motion-reduce:transition-none",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  }
)

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    size?: "default" | "sm" | "lg"
  }

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, size = "default", variant = "surface", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid min-w-0 auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

function CardTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
          className
        ),
      },
      props
    ),
    render,
    state: { slot: "card-title" },
  })
}

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground group-data-[variant=instrument]/card:text-instrument-muted",
        className
      )}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardAction({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
})
CardAction.displayName = "CardAction"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("min-w-0 px-(--card-spacing)", className)}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing) group-data-[variant=instrument]/card:border-instrument-border group-data-[variant=instrument]/card:bg-instrument-elevated",
        className
      )}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export {
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
export type { CardProps }
