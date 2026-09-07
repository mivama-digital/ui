import * as React from "react"
import { MivamaProvider } from "@mivama/ui"
import { Button } from "@mivama/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@mivama/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@mivama/ui/navigation-menu"
import { Calendar } from "@mivama/ui/calendar"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@mivama/ui/combobox"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@mivama/ui/carousel"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@mivama/ui/resizable"
import { DatePicker } from "@mivama/ui/date-picker"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@mivama/ui/input-otp"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@mivama/ui/drawer"
import { DataTable } from "@mivama/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"

interface TableItem {
  id: string
  name: string
  role: string
}

const tableData: TableItem[] = [
  { id: "1", name: "Alice", role: "Developer" },
  { id: "2", name: "Bob", role: "Designer" },
]

const tableColumns: any[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
]

export function KeyboardTestbed() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(2026, 8, 7)
  )
  const [pickerDate, setPickerDate] = React.useState<Date | undefined>()
  const [otpValue, setOtpValue] = React.useState("")
  const [menuAction, setMenuAction] = React.useState("")

  return (
    <MivamaProvider
      theme="product"
      density="comfortable"
      className="p-8 space-y-8 min-h-screen bg-background text-foreground"
    >
      <h1 className="text-2xl font-bold">Keyboard Testbed</h1>

      {/* 1. Menus */}
      <section data-testid="section-menu">
        <h2>Menu Family</h2>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button />}>
            Open dropdown menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setMenuAction("profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuAction("settings")}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {menuAction && <span data-testid="menu-action">{menuAction}</span>}
      </section>

      {/* 2. Navigation */}
      <section data-testid="section-navigation">
        <h2>Navigation Family</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Nav Products</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <a href="#prod-1" data-testid="nav-link">
                  Product Overview
                </a>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      {/* 3. Calendar */}
      <section data-testid="section-calendar">
        <h2>Calendar Family</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </section>

      {/* 4. Combobox */}
      <section data-testid="section-combobox">
        <h2>Combobox Family</h2>
        <Combobox>
          <ComboboxInput
            placeholder="Search framework..."
            aria-label="Framework search"
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxEmpty>No results</ComboboxEmpty>
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </section>

      {/* 5. Carousel */}
      <section data-testid="section-carousel" className="px-16">
        <h2>Carousel Family</h2>
        <Carousel className="w-64">
          <CarouselContent>
            <CarouselItem>
              <div className="p-4 border">Slide 1</div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-4 border">Slide 2</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious aria-label="Previous slide" />
          <CarouselNext aria-label="Next slide" />
        </Carousel>
      </section>

      {/* 6. Resizable */}
      <section data-testid="section-resizable">
        <h2>Resizable Family</h2>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-[100px] border rounded"
        >
          <ResizablePanel defaultSize={50} id="left-panel">
            Panel A
          </ResizablePanel>
          <ResizableHandle
            withHandle
            aria-label="Resize panels"
            id="resize-handle"
          />
          <ResizablePanel defaultSize={50} id="right-panel">
            Panel B
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>

      {/* 7. Date Picker */}
      <section data-testid="section-datepicker">
        <h2>Date Picker Family</h2>
        <DatePicker
          date={pickerDate}
          onDateChange={setPickerDate}
          placeholder="Select custom date"
        />
      </section>

      {/* 8. Input OTP */}
      <section data-testid="section-otp">
        <h2>Input OTP Family</h2>
        <InputOTP
          maxLength={4}
          value={otpValue}
          onChange={setOtpValue}
          aria-label="One-time code"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <span data-testid="otp-display">{otpValue}</span>
      </section>

      {/* 9. Drawer */}
      <section data-testid="section-drawer">
        <h2>Drawer Family</h2>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open test drawer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close drawer
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      {/* 10. Data Table */}
      <section data-testid="section-datatable">
        <h2>Data Table Family</h2>
        <DataTable columns={tableColumns} data={tableData} />
      </section>
    </MivamaProvider>
  )
}
