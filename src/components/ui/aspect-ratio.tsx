import * as React from "react"

import { cn } from "../../lib/utils.js"

interface AspectRatioProps extends React.ComponentProps<"div"> {
  ratio?: number
}

function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
          ...style,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio) w-full", className)}
      {...props}
    />
  )
}

export { AspectRatio }
export type { AspectRatioProps }
