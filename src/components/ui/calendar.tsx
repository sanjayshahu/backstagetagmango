"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-white group/calendar p-3 rounded-[24px] border border-neutral-6 [--cell-size:38px]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 aria-disabled:opacity-50 p-0 select-none rounded-full hover:bg-transparent",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 aria-disabled:opacity-50 p-0 select-none rounded-full hover:bg-transparent",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-8 w-full px-8",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-8 gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium text-neutral-12",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-neutral-11 w-[38px] font-normal text-xs select-none text-center",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-[38px]",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs select-none text-neutral-11",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative p-0 text-center group/day select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-[12px] bg-accent-alpha-3",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none bg-accent-alpha-2", defaultClassNames.range_middle),
        range_end: cn("rounded-r-[12px] bg-accent-alpha-3", defaultClassNames.range_end),
        today: cn(
          "font-semibold",
          defaultClassNames.today
        ),
        outside: cn(
          "text-neutral-10 opacity-50",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-neutral-10 opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-6 text-neutral-11", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-6 text-neutral-11", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[38px] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "size-[38px] rounded-[12px] flex items-center justify-center text-sm font-normal text-neutral-12 hover:bg-accent-alpha-2 transition-colors",
        "data-[selected-single=true]:bg-accent-alpha-9 data-[selected-single=true]:text-[#fff]",
        "data-[range-start=true]:bg-accent-alpha-9 data-[range-start=true]:text-[#fff] data-[range-start=true]:rounded-l-[12px]",
        "data-[range-end=true]:bg-accent-alpha-9 data-[range-end=true]:text-[#fff] data-[range-end=true]:rounded-r-[12px]",
        "data-[range-middle=true]:bg-accent-alpha-3 data-[range-middle=true]:rounded-none",
        "group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-accent-alpha-6",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
