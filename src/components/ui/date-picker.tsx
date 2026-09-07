"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "./button.js"
import { Calendar, type CalendarProps } from "./calendar.js"
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js"
import { cn } from "../../lib/utils.js"

interface DatePickerProps {
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  formatDate?: (date: Date) => string
  disabled?: boolean
  className?: string
  align?: "start" | "center" | "end"
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      date: controlledDate,
      defaultDate,
      onDateChange,
      placeholder = "Pick a date",
      formatDate,
      disabled = false,
      className,
      align = "start",
      calendarProps,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false)
    const [uncontrolledDate, setUncontrolledDate] = React.useState<
      Date | undefined
    >(defaultDate)

    const date =
      controlledDate !== undefined ? controlledDate : uncontrolledDate

    const handleSelect = (selected: Date | undefined) => {
      if (controlledDate === undefined) {
        setUncontrolledDate(selected)
      }
      onDateChange?.(selected)
      setOpen(false)
    }

    const formattedDate = date
      ? formatDate
        ? formatDate(date)
        : date.toLocaleDateString()
      : null

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={ref}
          data-slot="date-picker"
          render={
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
                className
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {formattedDate ? (
                <span>{formattedDate}</span>
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          }
        />
        <PopoverContent
          data-slot="date-picker-content"
          className="w-auto p-0"
          align={align}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            {...(calendarProps as any)}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
export type { DatePickerProps }
