"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils.js"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full ring-1 ring-border/50",
  {
    variants: {
      size: {
        default: "size-10 text-sm",
        sm: "size-8 text-xs",
        lg: "size-12 text-base",
        xl: "size-16 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "circle",
    },
  }
)

interface AvatarProps
  extends AvatarPrimitive.Root.Props, VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size, shape, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarPrimitive.Image.Props
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarPrimitive.Fallback.Props
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-[inherit] bg-muted font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2 *:ring-2 *:ring-background", className)}
      {...props}
    />
  )
}
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants }
export type { AvatarProps }
