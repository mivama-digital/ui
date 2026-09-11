import * as React from "react"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

export type DatePickerProps = React.ComponentProps<typeof Calendar>

export function DatePicker({ className, ...props }: DatePickerProps) {
  return <Calendar className={cn(className)} {...props} />
}
