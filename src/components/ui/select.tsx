import * as React from "react"
import type { ComponentProps } from "react"

import { useFieldContext } from "./field.js"
import { cn } from "../../lib/utils.js"

type SelectProps = ComponentProps<"select">

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    id: idProp,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    ...props
  },
  ref
) {
  const fieldContext = useFieldContext()
  const id = idProp ?? fieldContext?.id
  const ariaInvalid =
    ariaInvalidProp ?? (fieldContext?.isInvalid ? true : undefined)
  const ariaDescribedBy =
    ariaDescribedByProp ??
    (fieldContext?.descriptionId || fieldContext?.errorId
      ? [fieldContext.descriptionId, fieldContext.errorId]
          .filter(Boolean)
          .join(" ")
      : undefined)

  return (
    <select
      ref={ref}
      id={id}
      data-slot="select"
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className={cn(
        "min-h-(--control-height) w-full rounded-lg border border-input bg-background px-4 py-2.5 text-base text-foreground transition-colors outline-none motion-reduce:transition-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
})
Select.displayName = "Select"

export { Select }
export type { SelectProps }
