"use client"

import * as React from "react"
import { MivamaProvider } from "@mivama/ui/provider"
import { DirectionProvider } from "@mivama/ui/direction"
import { Button } from "@mivama/ui/button"
import { Input } from "@mivama/ui/input"
import { Textarea } from "@mivama/ui/textarea"
import { InputGroup, InputGroupAddon } from "@mivama/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@mivama/ui/input-otp"
import { Checkbox } from "@mivama/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@mivama/ui/radio-group"
import { Switch } from "@mivama/ui/switch"
import { Slider } from "@mivama/ui/slider"
import { Select } from "@mivama/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mivama/ui/tabs"
import { Toggle } from "@mivama/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@mivama/ui/toggle-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mivama/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mivama/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@mivama/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@mivama/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@mivama/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@mivama/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@mivama/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@mivama/ui/tooltip"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@mivama/ui/hover-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@mivama/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@mivama/ui/context-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@mivama/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@mivama/ui/navigation-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mivama/ui/command"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@mivama/ui/combobox"
import { Calendar } from "@mivama/ui/calendar"
import { DatePicker } from "@mivama/ui/date-picker"
import { Carousel, CarouselContent, CarouselItem } from "@mivama/ui/carousel"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@mivama/ui/resizable"
import { DataTable } from "@mivama/ui/data-table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@mivama/ui/chart"
import { Questionnaire } from "@mivama/ui/questionnaire"
import { ScrollArea } from "@mivama/ui/scroll-area"
import { MessageScroller } from "@mivama/ui/message-scroller"
import { Toaster, toast } from "@mivama/ui/toast"
import { Progress } from "@mivama/ui/progress"
import { Field, FieldDescription, FieldLabel } from "@mivama/ui/field"
import { Avatar, AvatarFallback } from "@mivama/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@mivama/ui/alert"
import { Choice } from "@mivama/ui/choice"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@mivama/ui/pagination"

export function ClientShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <MivamaProvider
      theme="product"
      density="compact"
      className="grid gap-6 rounded-xl border border-border p-6"
    >
      <DirectionProvider direction="ltr">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>MU</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold">Interactive Catalog Proof</h2>
            <p className="text-sm text-muted-foreground">
              Client boundary testbed covering interactive & complex primitives.
            </p>
          </div>
        </div>

        <Alert>
          <AlertTitle>Client Testbed</AlertTitle>
          <AlertDescription>
            All components compile with packed npm package dependencies.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="forms">
          <TabsList aria-label="Client fixture sections">
            <TabsTrigger value="forms">Forms & Input</TabsTrigger>
            <TabsTrigger value="menus">Menus & Overlays</TabsTrigger>
            <TabsTrigger value="complex">Complex Families</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="grid gap-4 pt-4">
            <Field>
              <FieldLabel htmlFor="fixture-input">Standard Input</FieldLabel>
              <Input id="fixture-input" placeholder="Type here..." />
              <FieldDescription>Accessible field wrapper</FieldDescription>
            </Field>

            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <Input placeholder="Amount" />
              <InputGroupAddon>.00</InputGroupAddon>
            </InputGroup>

            <Textarea placeholder="Textarea component" />

            <div className="flex items-center gap-4">
              <Choice
                type="checkbox"
                id="choice-1"
                aria-label="Choice component"
              />
              <Checkbox aria-label="Standalone checkbox" />
              <Switch aria-label="Fixture toggle" />
              <Toggle aria-label="Toggle">B</Toggle>
            </div>

            <RadioGroup defaultValue="1" className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="r1" />
                <label htmlFor="r1">Option 1</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="r2" />
                <label htmlFor="r2">Option 2</label>
              </div>
            </RadioGroup>

            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>

            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              aria-label="Slider"
            />

            <Select defaultValue="apple" className="w-48">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
            </Select>

            <div className="grid gap-2">
              <label>One-Time Password</label>
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Progress value={65} aria-label="Progress" />
          </TabsContent>

          <TabsContent value="menus" className="grid gap-4 pt-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Tab</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex flex-wrap items-center gap-2">
              <Dialog>
                <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
                <DialogContent>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>Dialog content body</DialogDescription>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Alert Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Action is irreversible.
                  </AlertDialogDescription>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>

              <Sheet>
                <SheetTrigger render={<Button variant="outline" />}>
                  Open Sheet
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle>Sheet Overlay</SheetTitle>
                  <SheetDescription>Side sheet panel</SheetDescription>
                </SheetContent>
              </Sheet>

              <Drawer>
                <DrawerTrigger render={<Button variant="outline" />}>
                  Open Drawer
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerTitle>Bottom Drawer</DrawerTitle>
                  <DrawerDescription>Accessible drawer sheet</DrawerDescription>
                </DrawerContent>
              </Drawer>

              <Popover>
                <PopoverTrigger render={<Button variant="outline" />}>
                  Popover
                </PopoverTrigger>
                <PopoverContent>Popover content</PopoverContent>
              </Popover>

              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" />}>
                  Hover Tooltip
                </TooltipTrigger>
                <TooltipContent>Helpful tip</TooltipContent>
              </Tooltip>

              <HoverCard>
                <HoverCardTrigger render={<Button variant="link" />}>
                  Hover Card
                </HoverCardTrigger>
                <HoverCardContent>Hover card preview</HoverCardContent>
              </HoverCard>

              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  Dropdown
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="secondary"
                onClick={() => toast({ title: "Notification dispatched" })}
              >
                Trigger Toast
              </Button>
            </div>

            <ContextMenu>
              <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed text-sm">
                Right-click here for ContextMenu
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Action 1</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <Accordion defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Accordion Item</AccordionTrigger>
                <AccordionContent>Accordion expanded content</AccordionContent>
              </AccordionItem>
            </Accordion>

            <Collapsible>
              <CollapsibleTrigger
                render={<Button variant="outline" size="sm" />}
              >
                Toggle Collapsible
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                Collapsible expanded content
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>

          <TabsContent value="complex" className="grid gap-6 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </div>
              <div className="grid gap-4">
                <DatePicker date={date} onDateChange={setDate} />
                <Combobox
                  items={[
                    { value: "next", label: "Next.js" },
                    { value: "vite", label: "Vite" },
                  ]}
                >
                  <ComboboxInput placeholder="Select framework..." />
                  <ComboboxContent>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: { value: string; label: string }) => (
                        <ComboboxItem key={item.value} value={item.value}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Search command..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Calendar</CommandItem>
                      <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>

            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                <CarouselItem className="p-4 bg-muted rounded-md text-center">
                  Slide 1
                </CarouselItem>
                <CarouselItem className="p-4 bg-muted rounded-md text-center">
                  Slide 2
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <ResizablePanelGroup
              orientation="horizontal"
              className="min-h-24 rounded-lg border"
            >
              <ResizablePanel defaultSize={50} className="p-4">
                Panel 1
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} className="p-4">
                Panel 2
              </ResizablePanel>
            </ResizablePanelGroup>

            <DataTable
              columns={[
                { accessorKey: "id", header: "ID" },
                { accessorKey: "name", header: "Name" },
              ]}
              data={[
                { id: "1", name: "Alpha" },
                { id: "2", name: "Beta" },
              ]}
            />

            <ChartContainer
              config={{
                value: { label: "Value", color: "var(--chart-1)" },
              }}
              className="min-h-32 w-full"
            >
              <div className="p-4 text-xs text-muted-foreground">
                Chart container ready
              </div>
            </ChartContainer>

            <Questionnaire
              steps={[
                {
                  id: "step1",
                  title: "Feedback",
                  type: "radio",
                  options: [
                    { value: "great", label: "Great" },
                    { value: "good", label: "Good" },
                  ],
                },
              ]}
            />

            <ScrollArea className="h-24 rounded border p-4">
              <p>Long scrollable viewport content in scroll area...</p>
            </ScrollArea>

            <MessageScroller className="max-h-24">
              <p>Scrollable client message stream...</p>
            </MessageScroller>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
        </Tabs>

        <Toaster />
      </DirectionProvider>
    </MivamaProvider>
  )
}
