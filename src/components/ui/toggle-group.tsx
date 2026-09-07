"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { toggleVariants } from "./toggle.js"
import { cn } from "../../lib/utils.js"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

interface ToggleGroupProps
  extends
    Omit<ToggleGroupPrimitive.Props, "value" | "defaultValue" | "type">,
    VariantProps<typeof toggleVariants> {
  spacing?: number
  type?: "single" | "multiple"
  value?: string | readonly string[]
  defaultValue?: string | readonly string[]
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      className,
      variant = "default",
      size = "default",
      spacing = 0,
      type,
      multiple,
      value,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) {
    const isMultiple = type === "multiple" || multiple === true

    const normalizedValue = React.useMemo(() => {
      if (value === undefined) return undefined
      return Array.isArray(value) ? value : [value]
    }, [value])

    const normalizedDefaultValue = React.useMemo(() => {
      if (defaultValue === undefined) return undefined
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }, [defaultValue])

    return (
      <ToggleGroupPrimitive
        ref={ref}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        multiple={isMultiple}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        onValueChange={onValueChange}
        style={{ "--gap": `${spacing}px` } as React.CSSProperties}
        className={cn(
          "group/toggle-group flex w-fit items-center gap-(--gap) rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
          className
        )}
        {...props}
      >
        <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive>
    )
  }
)
ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps
  extends TogglePrimitive.Props, VariantProps<typeof toggleVariants> {}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, children, variant, size, ...props },
  ref
) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps }
