import * as React from "react"

import { useFieldContext } from "./field.js"
import { cn } from "../../lib/utils.js"

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
      <textarea
        ref={ref}
        id={id}
        data-slot="textarea"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex field-sizing-content min-h-24 w-full rounded-lg border border-input bg-transparent px-4 py-3 text-base transition-colors outline-none motion-reduce:transition-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
