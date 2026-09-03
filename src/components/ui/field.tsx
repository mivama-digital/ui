import * as React from "react"
import type { ComponentProps } from "react"

import { cn } from "../../lib/utils.js"

interface FieldContextValue {
  id: string
  descriptionId: string
  errorId: string
  isInvalid: boolean
  isRequired: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext() {
  return React.useContext(FieldContext)
}

type FieldProps = ComponentProps<"div"> & {
  id?: string
  isInvalid?: boolean
  isRequired?: boolean
}
type FieldLabelProps = ComponentProps<"label">
type FieldDescriptionProps = ComponentProps<"p">
type FieldErrorProps = ComponentProps<"p">
type FieldsetProps = ComponentProps<"fieldset">
type FieldLegendProps = ComponentProps<"legend">

const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    className,
    id: customId,
    isInvalid = false,
    isRequired = false,
    children,
    ...props
  },
  ref
) {
  const generatedId = React.useId()
  const id = customId ?? generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const contextValue = React.useMemo<FieldContextValue>(
    () => ({
      id,
      descriptionId,
      errorId,
      isInvalid,
      isRequired,
    }),
    [id, descriptionId, errorId, isInvalid, isRequired]
  )

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="field"
        data-invalid={isInvalid || undefined}
        data-required={isRequired || undefined}
        className={cn("grid gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
})
Field.displayName = "Field"

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ className, htmlFor: htmlForProp, ...props }, ref) {
    const context = useFieldContext()
    const htmlFor = htmlForProp ?? context?.id

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        data-slot="field-label"
        className={cn("text-sm font-medium text-foreground", className)}
        {...props}
      />
    )
  }
)
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(function FieldDescription({ className, id: idProp, ...props }, ref) {
  const context = useFieldContext()
  const id = idProp ?? context?.descriptionId

  return (
    <p
      ref={ref}
      id={id}
      data-slot="field-description"
      className={cn("text-sm/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
})
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError({ className, id: idProp, ...props }, ref) {
    const context = useFieldContext()
    const id = idProp ?? context?.errorId

    return (
      <p
        ref={ref}
        id={id}
        data-slot="field-error"
        className={cn("text-sm/relaxed text-destructive-foreground", className)}
        {...props}
      />
    )
  }
)
FieldError.displayName = "FieldError"

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset({ className, ...props }, ref) {
    return (
      <fieldset
        ref={ref}
        data-slot="fieldset"
        className={cn("grid min-w-0 gap-4 disabled:opacity-50", className)}
        {...props}
      />
    )
  }
)
Fieldset.displayName = "Fieldset"

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  function FieldLegend({ className, ...props }, ref) {
    return (
      <legend
        ref={ref}
        data-slot="field-legend"
        className={cn(
          "mb-2 text-base font-semibold text-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
FieldLegend.displayName = "FieldLegend"

export {
  Field,
  FieldContext,
  useFieldContext,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  Fieldset,
}
export type {
  FieldContextValue,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldsetProps,
}
