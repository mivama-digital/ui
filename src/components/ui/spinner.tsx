import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "../../lib/utils.js"

interface SpinnerProps extends React.ComponentProps<"svg"> {}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
export type { SpinnerProps }
