import * as React from "react"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

export interface DatePickerProps {
  className?: string
}

export function DatePicker({ className }: DatePickerProps) {
  return <Calendar className={cn(className)} />
}
