import * as React from "react"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

export function AspectRatio({
  ratio = 16 / 9,
  className,
  ...props
}: AspectRatioProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className || ""}`}
      style={{ paddingTop: `${ratio * 100}%` }}
      {...props}
    />
  )
}
