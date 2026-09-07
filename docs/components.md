# Component Catalog & API Reference

Comprehensive reference for all 72 components in the `@mivama/ui` distribution (64 official shadcn/ui components + 8 Mivama proprietary extensions).

All components are built on top of **Base UI 1.7.0** primitives with neutral semantic token foundations, zero Radix dependencies, and strict accessibility compliance.

## Application Setup

Install `@mivama/ui` as a single unified package into your application:

```bash
npm install @mivama/ui
```

> [!NOTE]
> Applications install `@mivama/ui` directly from the package registry. You do not need to copy-paste component code via the shadcn CLI. The components in this distribution are pre-packaged, typed, tested, and tree-shakeable.

Mount the `MivamaProvider` and `Toaster` at the root of your application shell, and import the canonical stylesheet:

```tsx
import { MivamaProvider, Button, Toaster } from "@mivama/ui"
import "@mivama/ui/styles.css"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MivamaProvider theme="product">
      {children}
      <Toaster />
    </MivamaProvider>
  )
}
```

## Component Catalog

## MivamaProvider (provider)

### Import

```tsx
// Root barrel import
import { MivamaProvider, useMivamaTheme, useMivamaDensity, useMivamaPortalContainer, useShellAttributes } from "@mivama/ui"

// Clean subpath import
import { MivamaProvider, useMivamaTheme, useMivamaDensity, useMivamaPortalContainer, useShellAttributes } from "@mivama/ui/provider"
```

### Purpose

Application shell context provider that establishes the design system theme, density, portal container root, and shell attributes across all child components.

### Render Environment

Client component ("use client") managing React context, DOM root attribute synchronization, and portal target registration.

### Accessibility & Keyboard Interaction

Sets data-mivama-theme and data-density on the shell element; establishes isolated portal container with proper stacking context to preserve assistive technology tree traversal.

### Variants & States

Themes: 'product' (default shadcn neutral baseline), 'editorial' (warm editorial brand), 'portal' (dense console). Density: 'comfortable' (default, 44px min targets), 'compact' (32px targets).

### Minimal Example

```tsx
import { MivamaProvider, Button, Toaster } from "@mivama/ui"
import "@mivama/ui/styles.css"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MivamaProvider theme="product" density="comfortable">
      {children}
      <Toaster />
    </MivamaProvider>
  )
}
```

---

## Alert (alert)

### Import

```tsx
// Root barrel import
import { Alert, AlertTitle, AlertDescription } from "@mivama/ui"

// Clean subpath import
import { Alert, AlertTitle, AlertDescription } from "@mivama/ui/alert"
```

### Purpose

Displays brief, important messages to attract user attention without interrupting their current workflow.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Renders with role='alert' for assertive announcements (destructive) or role='status' for polite notifications (default/info). Supports aria-live override.

### Variants & States

Variants: default (neutral surface with muted border), destructive (high-contrast error alert with destructive border and text).

### Minimal Example

```tsx
import { Alert, AlertTitle, AlertDescription } from "@mivama/ui/alert"
import { AlertCircle } from "lucide-react"

export function SystemAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please re-authenticate.</AlertDescription>
    </Alert>
  )
}
```

---

## AspectRatio (aspect-ratio)

### Import

```tsx
// Root barrel import
import { AspectRatio } from "@mivama/ui"

// Clean subpath import
import { AspectRatio } from "@mivama/ui/aspect-ratio"
```

### Purpose

Displays visual media or content within a constrained aspect ratio container to prevent layout shifts during asset loading.

### Render Environment

Server-safe component (zero client JavaScript overhead; uses CSS aspect-ratio with fallback padding calculation).

### Accessibility & Keyboard Interaction

Passes through standard HTML attributes; child media should provide alt text or appropriate aria-hidden attributes.

### Variants & States

Supports any numeric ratio prop (e.g. 16 / 9, 4 / 3, 1 / 1). Default ratio is 1 / 1.

### Minimal Example

```tsx
import { AspectRatio } from "@mivama/ui/aspect-ratio"

export function MediaCard() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
      <img src="/preview.jpg" alt="Project preview" className="object-cover w-full h-full" />
    </AspectRatio>
  )
}
```

---

## Attachment (attachment)

### Import

```tsx
// Root barrel import
import { Attachment, AttachmentList, AttachmentRemove, AttachmentPreview } from "@mivama/ui"

// Clean subpath import
import { Attachment, AttachmentList, AttachmentRemove, AttachmentPreview } from "@mivama/ui/attachment"
```

### Purpose

Renders uploaded files, documents, or attachments with metadata, progress indicators, and removal actions.

### Render Environment

Server-safe wrapper with optional client interaction buttons for file removal and preview triggers.

### Accessibility & Keyboard Interaction

Keyboard navigable remove button with explicit aria-label; announces file name, size, and upload status to screen readers.

### Variants & States

States: default, uploading (with progress indication), error, disabled.

### Minimal Example

```tsx
import { Attachment, AttachmentList, AttachmentRemove } from "@mivama/ui/attachment"
import { FileText } from "lucide-react"

export function FileAttachments() {
  return (
    <AttachmentList>
      <Attachment>
        <FileText className="h-4 w-4" />
        <span className="text-sm font-medium">specs.pdf (2.4 MB)</span>
        <AttachmentRemove aria-label="Remove specs.pdf" onClick={() => {}} />
      </Attachment>
    </AttachmentList>
  )
}
```

---

## Badge (badge)

### Import

```tsx
// Root barrel import
import { Badge, badgeVariants } from "@mivama/ui"

// Clean subpath import
import { Badge, badgeVariants } from "@mivama/ui/badge"
```

### Purpose

Displays small status descriptors, category tags, count counters, or metadata indicators.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Rendered as an inline badge with visible text; count badges should include screen reader context via aria-label when iconography is used.

### Variants & States

Variants: default (primary), secondary, destructive, outline, success, warning. Sizes: sm, default.

### Minimal Example

```tsx
import { Badge } from "@mivama/ui/badge"

export function StatusBadge() {
  return <Badge variant="secondary">In Progress</Badge>
}
```

---

## BentoGrid (bento-grid)

### Import

```tsx
// Root barrel import
import { BentoGrid, BentoGridItem } from "@mivama/ui"

// Clean subpath import
import { BentoGrid, BentoGridItem } from "@mivama/ui/bento-grid"
```

### Purpose

Responsive grid layout primitive for structured marketing, feature showcase, and dashboard card layouts.

### Render Environment

Server-safe component (zero client JavaScript overhead; uses responsive CSS grid classes).

### Accessibility & Keyboard Interaction

Provides semantic list or grid presentation; child cards retain standard keyboard navigation and document structure.

### Variants & States

BentoGridItem supports colSpan and rowSpan props (1-4) mapped to breakpoint-aware Tailwind grid spans.

### Minimal Example

```tsx
import { BentoGrid, BentoGridItem } from "@mivama/ui/bento-grid"

export function FeatureSection() {
  return (
    <BentoGrid>
      <BentoGridItem colSpan={2} title="Analytics" description="Real-time pipeline metrics." />
      <BentoGridItem colSpan={1} title="Security" description="SOC 2 Type II certified." />
    </BentoGrid>
  )
}
```

---

## Breadcrumb (breadcrumb)

### Import

```tsx
// Root barrel import
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@mivama/ui"

// Clean subpath import
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@mivama/ui/breadcrumb"
```

### Purpose

Hierarchical navigation component indicating the user's current location within the application's page structure.

### Render Environment

Server-safe component (zero client JavaScript overhead; renders standard semantic nav, ol, li, and anchor elements).

### Accessibility & Keyboard Interaction

Nav element with aria-label='breadcrumb'; current page has aria-current='page'; separators are aria-hidden='true'.

### Variants & States

States: interactive link, current active page (non-interactive), collapsed ellipsis.

### Minimal Example

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@mivama/ui/breadcrumb"

export function Navigation() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

---

## Bubble (bubble)

### Import

```tsx
// Root barrel import
import { Bubble, BubbleHeader, BubbleBody, BubbleFooter, BubbleAuthor, BubbleTimestamp } from "@mivama/ui"

// Clean subpath import
import { Bubble, BubbleHeader, BubbleBody, BubbleFooter, BubbleAuthor, BubbleTimestamp } from "@mivama/ui/bubble"
```

### Purpose

Chat bubble primitive for conversation threads, assistant interactions, and messaging timelines.

### Render Environment

Server-safe component for thread rendering with optional interactive actions.

### Accessibility & Keyboard Interaction

Semantic message container; timestamps and author metadata are structured for linear screen reader consumption.

### Variants & States

Variants: incoming (muted neutral surface), outgoing (primary brand surface).

### Minimal Example

```tsx
import { Bubble, BubbleBody, BubbleAuthor, BubbleTimestamp } from "@mivama/ui/bubble"

export function ChatMessage() {
  return (
    <Bubble variant="incoming">
      <BubbleAuthor>Assistant</BubbleAuthor>
      <BubbleBody>How can I help you today?</BubbleBody>
      <BubbleTimestamp>12:00 PM</BubbleTimestamp>
    </Bubble>
  )
}
```

---

## Button (button)

### Import

```tsx
// Root barrel import
import { Button, buttonVariants } from "@mivama/ui"

// Clean subpath import
import { Button, buttonVariants } from "@mivama/ui/button"
```

### Purpose

Interactive button control for executing actions, submitting forms, or triggering modal and dropdown interfaces.

### Render Environment

Client component ("use client") supporting click handlers, loading states, and keyboard activation.

### Accessibility & Keyboard Interaction

Defaults to type='button' to prevent accidental form submission; exposes aria-busy and disabled states; enforces min 44px touch target (unless xs density).

### Variants & States

Variants: default, destructive, outline, secondary, ghost, link, inverse. Sizes: default, sm, lg, xs, icon, icon-xs. States: hover, active, focus-visible, disabled, loading.

### Minimal Example

```tsx
import { Button } from "@mivama/ui/button"

export function ActionButton() {
  return <Button variant="default" onClick={() => alert("Action triggered")}>Continue</Button>
}
```

---

## ButtonGroup (button-group)

### Import

```tsx
// Root barrel import
import { ButtonGroup } from "@mivama/ui"

// Clean subpath import
import { ButtonGroup } from "@mivama/ui/button-group"
```

### Purpose

Visually groups related buttons together with contiguous borders, merged corner radiuses, and coherent visual flow.

### Render Environment

Server-safe wrapper grouping child buttons; supports client event delegation.

### Accessibility & Keyboard Interaction

Renders with role='group' and supports aria-label to identify the cluster to assistive technologies.

### Variants & States

Orientations: horizontal (default), vertical. Density: comfortable, compact.

### Minimal Example

```tsx
import { ButtonGroup } from "@mivama/ui/button-group"
import { Button } from "@mivama/ui/button"

export function ActionCluster() {
  return (
    <ButtonGroup aria-label="Editor controls">
      <Button variant="outline">Undo</Button>
      <Button variant="outline">Redo</Button>
    </ButtonGroup>
  )
}
```

---

## Calendar (calendar)

### Import

```tsx
// Root barrel import
import { Calendar } from "@mivama/ui"

// Clean subpath import
import { Calendar } from "@mivama/ui/calendar"
```

### Purpose

Accessible date picker calendar grid allowing users to view dates, select individual days, or pick date ranges.

### Render Environment

Client component ("use client") powered by react-day-picker with complete keyboard focus management.

### Accessibility & Keyboard Interaction

Table grid semantics with role='grid'; full keyboard arrow navigation between days, PageUp/PageDown for month jumps; aria-selected for current date.

### Variants & States

Modes: single, range, multiple. States: default, selected, today, disabled, outside month.

### Minimal Example

```tsx
import * as React from "react"
import { Calendar } from "@mivama/ui/calendar"

export function DateSelector() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
}
```

---

## Card (card)

### Import

```tsx
// Root barrel import
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@mivama/ui"

// Clean subpath import
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@mivama/ui/card"
```

### Purpose

Surface container grouping related information, actions, and media into a cohesive visual card.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Clean section or article semantic container; interactive card variant uses focus-within styles without hijacking semantic links or buttons.

### Variants & States

Variants: default, interactive (hover lift and focus-within ring). States: resting, hover.

### Minimal Example

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mivama/ui/card"
import { Button } from "@mivama/ui/button"

export function OverviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure your alert preferences.</CardDescription>
      </CardHeader>
      <CardContent><p className="text-sm">You have 3 unread updates.</p></CardContent>
      <CardFooter><Button variant="outline">Mark as read</Button></CardFooter>
    </Card>
  )
}
```

---

## Carousel (carousel)

### Import

```tsx
// Root barrel import
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel } from "@mivama/ui"

// Clean subpath import
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel } from "@mivama/ui/carousel"
```

### Purpose

Horizontal or vertical sliding carousel for showcasing media, testimonial items, or modular card sequences.

### Render Environment

Client component ("use client") built on embla-carousel-react with swipe and keyboard support.

### Accessibility & Keyboard Interaction

Renders role='region' with aria-roledescription='carousel'; items have role='group' and aria-roledescription='slide'; keyboard navigation with Arrow keys.

### Variants & States

Orientations: horizontal (default), vertical. States: previous/next disabled at boundaries unless loop enabled.

### Minimal Example

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@mivama/ui/carousel"

export function Showcase() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem><div className="p-4 border rounded-md">Slide 1</div></CarouselItem>
        <CarouselItem><div className="p-4 border rounded-md">Slide 2</div></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

---

## Checkbox (checkbox)

### Import

```tsx
// Root barrel import
import { Checkbox } from "@mivama/ui"

// Clean subpath import
import { Checkbox } from "@mivama/ui/checkbox"
```

### Purpose

Binary selection control allowing users to toggle an option between checked, unchecked, or indeterminate states.

### Render Environment

Client component ("use client") built on Base UI Checkbox primitive with full state reflection.

### Accessibility & Keyboard Interaction

Role='checkbox'; sets aria-checked to true, false, or 'mixed'; Space key toggles state; supports aria-invalid and aria-describedby.

### Variants & States

States: unchecked, checked, indeterminate, disabled, focus-visible, error.

### Minimal Example

```tsx
import { Checkbox } from "@mivama/ui/checkbox"
import { Label } from "@mivama/ui/label"

export function TermsCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
```

---

## Choice (choice)

### Import

```tsx
// Root barrel import
import { Choice, ChoiceGroup } from "@mivama/ui"

// Clean subpath import
import { Choice, ChoiceGroup } from "@mivama/ui/choice"
```

### Purpose

High-level semantic form control combining native input (checkbox/radio), label, description, and error messaging into a unified group.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Labels automatically associate with inputs; descriptions and errors link via aria-describedby; respects disabled and aria-invalid attributes.

### Variants & States

Types: checkbox, radio. States: unchecked, checked, disabled, error.

### Minimal Example

```tsx
import { Choice, ChoiceGroup } from "@mivama/ui/choice"

export function PreferenceChoice() {
  return (
    <ChoiceGroup>
      <Choice type="checkbox" name="marketing" label="Receive newsletters" description="Weekly curated product digest." />
    </ChoiceGroup>
  )
}
```

---

## Combobox (combobox)

### Import

```tsx
// Root barrel import
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@mivama/ui"

// Clean subpath import
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@mivama/ui/combobox"
```

### Purpose

Searchable selection input combining text input with a filtered popover list of selectable options.

### Render Environment

Client component ("use client") built on cmdk with live filtering and keyboard navigation.

### Accessibility & Keyboard Interaction

Role='combobox' with aria-expanded, aria-controls, and aria-autocomplete; ArrowUp/Down navigation, Enter selection, Escape closure.

### Variants & States

States: closed, open, focused, disabled, empty results.

### Minimal Example

```tsx
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@mivama/ui/combobox"

export function FrameworkPicker() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Search framework..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxItem value="react">React</ComboboxItem>
          <ComboboxItem value="vue">Vue</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

---

## Command (command)

### Import

```tsx
// Root barrel import
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from "@mivama/ui"

// Clean subpath import
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from "@mivama/ui/command"
```

### Purpose

Fast, composable command palette primitive for keyboard-first navigation, search, and action dispatching.

### Render Environment

Client component ("use client") built on cmdk with instant in-memory filtering and keyboard traps.

### Accessibility & Keyboard Interaction

Full dialog modal semantics via CommandDialog; aria-selected active item highlight; Arrow key navigation; Escape to close.

### Variants & States

Display modes: inline palette (Command), modal overlay (CommandDialog). States: empty, grouped, filtered, selected.

### Minimal Example

```tsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@mivama/ui/command"

export function QuickMenu() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => {}}>Calendar</CommandItem>
          <CommandItem onSelect={() => {}}>Search Emoji</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

---

## Container (container)

### Import

```tsx
// Root barrel import
import { Container } from "@mivama/ui"

// Clean subpath import
import { Container } from "@mivama/ui/container"
```

### Purpose

Responsive page-width constraint primitive aligning layouts to maximum content widths with symmetric gutters.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Pure layout container; passes through landmark role or semantic tag as specified by the consumer.

### Variants & States

Sizes: default (max-w-7xl), narrow (max-w-4xl), wide (max-w-[90rem]), full (w-full).

### Minimal Example

```tsx
import { Container } from "@mivama/ui/container"

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <Container size="default">{children}</Container>
}
```

---

## ContextMenu (context-menu)

### Import

```tsx
// Root barrel import
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup } from "@mivama/ui"

// Clean subpath import
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup } from "@mivama/ui/context-menu"
```

### Purpose

Contextual menu triggered by right-click or long-press gestures, displaying actions relevant to the clicked element.

### Render Environment

Client component ("use client") built on Base UI Menu primitive with pointer positioning.

### Accessibility & Keyboard Interaction

Role='menu' with role='menuitem'; Arrow key navigation, Escape to close; portaled to MivamaProvider portal container.

### Variants & States

Items: standard item, checkbox item (aria-checked), radio item, nested submenu. States: normal, hover, focused, disabled.

### Minimal Example

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@mivama/ui/context-menu"

export function RightClickArea() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

---

## DatePicker (date-picker)

### Import

```tsx
// Root barrel import
import { DatePicker } from "@mivama/ui"

// Clean subpath import
import { DatePicker } from "@mivama/ui/date-picker"
```

### Purpose

Popover-backed date picker combining an input trigger with an interactive Calendar grid for single date selection.

### Render Environment

Client component ("use client") combining Popover, Button, and Calendar with formatted date display.

### Accessibility & Keyboard Interaction

Trigger exposes aria-haspopup='dialog' and aria-expanded; popover traps focus and returns focus to trigger on closure.

### Variants & States

States: unselected (placeholder), selected (formatted date), open, disabled.

### Minimal Example

```tsx
import * as React from "react"
import { DatePicker } from "@mivama/ui/date-picker"

export function BookingDate() {
  const [selected, setSelected] = React.useState<Date | undefined>()
  return <DatePicker date={selected} onDateChange={setSelected} placeholder="Select booking date" />
}
```

---

## Dialog (dialog)

### Import

```tsx
// Root barrel import
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@mivama/ui"

// Clean subpath import
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@mivama/ui/dialog"
```

### Purpose

Modal overlay dialog interrupting the user's flow to convey critical information or solicit confirmation.

### Render Environment

Client component ("use client") built on Base UI Dialog with focus trapping and portal rendering.

### Accessibility & Keyboard Interaction

Role='dialog' with aria-modal='true'; aria-labelledby points to DialogTitle, aria-describedby points to DialogDescription; traps focus; Escape dismisses.

### Variants & States

Sizes: default (max-w-lg), sm, lg, full. States: open, closed, animating in/out.

### Minimal Example

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@mivama/ui/dialog"
import { Button } from "@mivama/ui/button"

export function ConfirmationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>Are you sure you want to proceed?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Direction (direction)

### Import

```tsx
// Root barrel import
import { DirectionProvider, useDirection } from "@mivama/ui"

// Clean subpath import
import { DirectionProvider, useDirection } from "@mivama/ui/direction"
```

### Purpose

Provider component establishing left-to-right (LTR) or right-to-left (RTL) reading and interaction direction.

### Render Environment

Client component ("use client") managing directional context and mirroring appropriate positioning math.

### Accessibility & Keyboard Interaction

Propagates dir='ltr' | 'rtl' to child subtrees; enables directional navigation, icon flips, and margin adjustments.

### Variants & States

Directions: 'ltr' (default), 'rtl'.

### Minimal Example

```tsx
import { DirectionProvider } from "@mivama/ui/direction"

export function LocalizedSubtree({ children }: { children: React.ReactNode }) {
  return <DirectionProvider dir="rtl">{children}</DirectionProvider>
}
```

---

## Drawer (drawer)

### Import

```tsx
// Root barrel import
import { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerOverlay, DrawerPortal } from "@mivama/ui"

// Clean subpath import
import { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerOverlay, DrawerPortal } from "@mivama/ui/drawer"
```

### Purpose

Slide-over drawer component docking to viewport edges, ideal for mobile navigation, detail panels, and edit flows.

### Render Environment

Client component ("use client") built on Base UI Dialog primitive with gesture and edge-docking styling.

### Accessibility & Keyboard Interaction

Role='dialog' with aria-modal='true'; focus trapped inside drawer; Escape key dismisses; accessible close button provided.

### Variants & States

Sides: bottom (default mobile bottom sheet), top, left, right. States: open, closed.

### Minimal Example

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@mivama/ui/drawer"
import { Button } from "@mivama/ui/button"

export function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Options</DrawerTitle>
          <DrawerDescription>Adjust your mobile settings.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter><DrawerClose asChild><Button variant="outline">Close</Button></DrawerClose></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

---

## EditorialGrid (editorial-grid)

### Import

```tsx
// Root barrel import
import { EditorialGrid } from "@mivama/ui"

// Clean subpath import
import { EditorialGrid } from "@mivama/ui/editorial-grid"
```

### Purpose

Editorial magazine-style grid primitive providing asymmetrical responsive multi-column layouts.

### Render Environment

Server-safe component (zero client JavaScript overhead; uses responsive CSS grid layout).

### Accessibility & Keyboard Interaction

Preserves natural document order and focus traversal across asymmetrical visual arrangements.

### Variants & States

Layout variants: symmetric (default), asymmetrical-left, asymmetrical-right.

### Minimal Example

```tsx
import { EditorialGrid } from "@mivama/ui/editorial-grid"

export function BrandStory() {
  return (
    <EditorialGrid>
      <div className="col-span-8"><h2>Featured Story</h2></div>
      <div className="col-span-4"><aside>Sidebar notes</aside></div>
    </EditorialGrid>
  )
}
```

---

## Empty (empty)

### Import

```tsx
// Root barrel import
import { Empty, EmptyImage, EmptyTitle, EmptyDescription, EmptyActions } from "@mivama/ui"

// Clean subpath import
import { Empty, EmptyImage, EmptyTitle, EmptyDescription, EmptyActions } from "@mivama/ui/empty"
```

### Purpose

Placeholder display for views with zero records, search results, or initial empty collection states.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

EmptyTitle provides accessible heading; EmptyDescription uses semantic paragraph; decorative imagery is aria-hidden.

### Variants & States

Variants: default (centered card/container), compact (inline card).

### Minimal Example

```tsx
import { Empty, EmptyTitle, EmptyDescription, EmptyActions } from "@mivama/ui/empty"
import { Button } from "@mivama/ui/button"

export function NoDataView() {
  return (
    <Empty>
      <EmptyTitle>No projects found</EmptyTitle>
      <EmptyDescription>Get started by creating your first workspace project.</EmptyDescription>
      <EmptyActions><Button variant="default">Create Project</Button></EmptyActions>
    </Empty>
  )
}
```

---

## Field (field)

### Import

```tsx
// Root barrel import
import { Field, FieldLabel, FieldDescription, FieldError, Fieldset, FieldLegend } from "@mivama/ui"

// Clean subpath import
import { Field, FieldLabel, FieldDescription, FieldError, Fieldset, FieldLegend } from "@mivama/ui/field"
```

### Purpose

Foundational accessible form layout components associating labels, descriptions, and errors with form inputs.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

FieldLabel connects via htmlFor; FieldDescription and FieldError connect via aria-describedby; FieldError renders role='alert'.

### Variants & States

States: default, invalid (applies error token styling to labels and messages), disabled.

### Minimal Example

```tsx
import { Field, FieldLabel, FieldDescription, FieldError } from "@mivama/ui/field"
import { Input } from "@mivama/ui/input"

export function EmailField() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@domain.com" />
      <FieldDescription id="email-help">We never share your email.</FieldDescription>
    </Field>
  )
}
```

---

## HoverCard (hover-card)

### Import

```tsx
// Root barrel import
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal } from "@mivama/ui"

// Clean subpath import
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal } from "@mivama/ui/hover-card"
```

### Purpose

Preview popover displaying additional rich content when the user hovers over a link or interactive element.

### Render Environment

Client component ("use client") built on Base UI Popover with hover delay triggers.

### Accessibility & Keyboard Interaction

Keyboard users can trigger via focus; content does not disrupt page flow; portaled into the MivamaProvider portal container.

### Variants & States

Sides: top, right, bottom, left. States: closed, open.

### Minimal Example

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mivama/ui/hover-card"

export function AuthorPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild><a href="/user/jane" className="underline">@jane</a></HoverCardTrigger>
      <HoverCardContent><p className="text-sm">Jane Doe — Staff Engineer</p></HoverCardContent>
    </HoverCard>
  )
}
```

---

## Input (input)

### Import

```tsx
// Root barrel import
import { Input } from "@mivama/ui"

// Clean subpath import
import { Input } from "@mivama/ui/input"
```

### Purpose

Standard text input field for collecting user textual and numerical data.

### Render Environment

Server-safe component (zero client JavaScript overhead; standard HTML input element).

### Accessibility & Keyboard Interaction

Supports aria-invalid, aria-describedby, required, and disabled attributes; visible focus ring with ring tokens.

### Variants & States

Variants: default, destructive/error. Sizes: default (44px target), compact (32px target). States: resting, hover, focus, disabled.

### Minimal Example

```tsx
import { Input } from "@mivama/ui/input"

export function SearchField() {
  return <Input type="search" placeholder="Search components..." />
}
```

---

## InputGroup (input-group)

### Import

```tsx
// Root barrel import
import { InputGroup, InputGroupAddon, InputGroupButton } from "@mivama/ui"

// Clean subpath import
import { InputGroup, InputGroupAddon, InputGroupButton } from "@mivama/ui/input-group"
```

### Purpose

Attaches leading/trailing icons, text badges, or interactive action buttons directly to an input field.

### Render Environment

Client component ("use client") managing focus propagation between addons and the inner input.

### Accessibility & Keyboard Interaction

Maintains clear tab order; decorative icons are aria-hidden; attached action buttons retain accessible names.

### Variants & States

Placements: leading addon, trailing addon, or both.

### Minimal Example

```tsx
import { InputGroup, InputGroupAddon } from "@mivama/ui/input-group"
import { Input } from "@mivama/ui/input"
import { Search } from "lucide-react"

export function GroupedSearch() {
  return (
    <InputGroup>
      <InputGroupAddon><Search className="h-4 w-4 text-muted-foreground" /></InputGroupAddon>
      <Input placeholder="Search..." />
    </InputGroup>
  )
}
```

---

## InputOTP (input-otp)

### Import

```tsx
// Root barrel import
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@mivama/ui"

// Clean subpath import
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@mivama/ui/input-otp"
```

### Purpose

One-time password (OTP) input component with segmented slot display for verification codes.

### Render Environment

Client component ("use client") built on input-otp with numeric slot coordination and paste handling.

### Accessibility & Keyboard Interaction

Underlying native input has inputMode='numeric', autoComplete='one-time-code', and manages active slot focus indicators.

### Variants & States

Slot lengths: 4, 6, 8. States: empty, filled, active (pulsing caret), disabled.

### Minimal Example

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@mivama/ui/input-otp"

export function TwoFactorCode() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

---

## Item (item)

### Import

```tsx
// Root barrel import
import { Item } from "@mivama/ui"

// Clean subpath import
import { Item } from "@mivama/ui/item"
```

### Purpose

Generic list or navigation item wrapper providing consistent layout, hover feedback, and padding.

### Render Environment

Server-safe component (zero client JavaScript overhead).

### Accessibility & Keyboard Interaction

Semantic list item or interactive button depending on rendered element; preserves accessible keyboard interactions.

### Variants & States

States: default, active/selected, disabled.

### Minimal Example

```tsx
import { Item } from "@mivama/ui/item"

export function NavItem() {
  return <Item className="hover:bg-accent">Settings</Item>
}
```

---

## Kbd (kbd)

### Import

```tsx
// Root barrel import
import { Kbd } from "@mivama/ui"

// Clean subpath import
import { Kbd } from "@mivama/ui/kbd"
```

### Purpose

Displays keyboard shortcuts and key combinations using semantic keyboard markup.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Renders semantic kbd element; screen readers announce key combination symbols accurately.

### Variants & States

Sizes: default, sm. Variants: default, outline.

### Minimal Example

```tsx
import { Kbd } from "@mivama/ui/kbd"

export function ShortcutHint() {
  return <p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search</p>
}
```

---

## Label (label)

### Import

```tsx
// Root barrel import
import { Label } from "@mivama/ui"

// Clean subpath import
import { Label } from "@mivama/ui/label"
```

### Purpose

Accessible text label for form inputs, checkboxes, switches, and radio items.

### Render Environment

Server-safe component (zero client JavaScript overhead).

### Accessibility & Keyboard Interaction

Renders semantic label element; associates with form controls via htmlFor; prevents text selection on double-click.

### Variants & States

States: default, disabled (dimmed opacity and cursor-not-allowed).

### Minimal Example

```tsx
import { Label } from "@mivama/ui/label"
import { Input } from "@mivama/ui/input"

export function LabeledInput() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" />
    </div>
  )
}
```

---

## Marker (marker)

### Import

```tsx
// Root barrel import
import { Marker } from "@mivama/ui"

// Clean subpath import
import { Marker } from "@mivama/ui/marker"
```

### Purpose

Visual badge marker indicating notifications, unread messages, or live status pulses.

### Render Environment

Server-safe component (zero client JavaScript overhead).

### Accessibility & Keyboard Interaction

Exposes aria-hidden when purely decorative, or includes screen reader text when indicating status.

### Variants & States

Tones: primary, destructive, success, warning. States: solid, pulsing.

### Minimal Example

```tsx
import { Marker } from "@mivama/ui/marker"

export function NotificationBell() {
  return (
    <div className="relative inline-block">
      <span className="sr-only">Notifications</span>
      <Marker tone="destructive" />
    </div>
  )
}
```

---

## Menubar (menubar)

### Import

```tsx
// Root barrel import
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut } from "@mivama/ui"

// Clean subpath import
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut } from "@mivama/ui/menubar"
```

### Purpose

Desktop application top navigation menu bar with cascading drop-down submenus.

### Render Environment

Client component ("use client") built on Base UI Menu with horizontal trigger bar orchestration.

### Accessibility & Keyboard Interaction

Role='menubar'; ArrowLeft/Right to navigate between top-level menus, ArrowDown to enter, ArrowUp/Down to navigate items, Escape to close.

### Variants & States

Items: standard item, checkbox item, radio group item, nested submenu. States: closed, open, hover, disabled.

### Minimal Example

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@mivama/ui/menubar"

export function TopNav() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent><MenubarItem>New Tab</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

---

## Message (message)

### Import

```tsx
// Root barrel import
import { Message, MessageHeader, MessageBody, MessageFooter, MessageAuthor, MessageTimestamp } from "@mivama/ui"

// Clean subpath import
import { Message, MessageHeader, MessageBody, MessageFooter, MessageAuthor, MessageTimestamp } from "@mivama/ui/message"
```

### Purpose

Structural message primitive for activity feeds, system notices, and audit timeline records.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Structured with semantic header, body, and timestamp elements for linear screen reader consumption.

### Variants & States

Variants: default (neutral border), highlighted, compact.

### Minimal Example

```tsx
import { Message, MessageHeader, MessageBody, MessageAuthor, MessageTimestamp } from "@mivama/ui/message"

export function LogEntry() {
  return (
    <Message>
      <MessageHeader>
        <MessageAuthor>System</MessageAuthor>
        <MessageTimestamp>Just now</MessageTimestamp>
      </MessageHeader>
      <MessageBody>Deployment completed successfully.</MessageBody>
    </Message>
  )
}
```

---

## MessageScroller (message-scroller)

### Import

```tsx
// Root barrel import
import { MessageScroller } from "@mivama/ui"

// Clean subpath import
import { MessageScroller } from "@mivama/ui/message-scroller"
```

### Purpose

Auto-scrolling container optimized for chat logs, terminal streams, and live event consoles.

### Render Environment

Client component ("use client") with scroll-to-bottom pinning and user scroll intervention detection.

### Accessibility & Keyboard Interaction

Scroll container with role='log' and aria-live='polite'; maintains scroll position without disorienting assistive technology.

### Variants & States

States: pinned to bottom, user scrolled up (pause pinning).

### Minimal Example

```tsx
import { MessageScroller } from "@mivama/ui/message-scroller"

export function ChatContainer({ children }: { children: React.ReactNode }) {
  return <MessageScroller className="h-96">{children}</MessageScroller>
}
```

---

## NativeSelect (native-select)

### Import

```tsx
// Root barrel import
import { NativeSelect } from "@mivama/ui"

// Clean subpath import
import { NativeSelect } from "@mivama/ui/native-select"
```

### Purpose

Standard HTML select dropdown wrapped with design system typography, borders, and custom arrow styling.

### Render Environment

Server-safe component (zero client JavaScript overhead; standard HTML select).

### Accessibility & Keyboard Interaction

Native select element offering best-in-class mobile and assistive technology form controls.

### Variants & States

States: default, focus, disabled, error.

### Minimal Example

```tsx
import { NativeSelect } from "@mivama/ui/native-select"

export function CountrySelect() {
  return (
    <NativeSelect defaultValue="de">
      <option value="de">Germany</option>
      <option value="us">United States</option>
    </NativeSelect>
  )
}
```

---

## NavigationMenu (navigation-menu)

### Import

```tsx
// Root barrel import
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport } from "@mivama/ui"

// Clean subpath import
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport } from "@mivama/ui/navigation-menu"
```

### Purpose

Website and application top-level navigation system with animated mega-menu panels.

### Render Environment

Client component ("use client") built on Base UI Navigation Menu with shared viewport animations.

### Accessibility & Keyboard Interaction

Role='navigation'; aria-expanded on triggers; full keyboard arrow navigation; Escape closes active panel.

### Variants & States

Orientations: horizontal (default), vertical. States: closed, open, moving between triggers.

### Minimal Example

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@mivama/ui/navigation-menu"

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4">Overview and catalog</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

---

## Pagination (pagination)

### Import

```tsx
// Root barrel import
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@mivama/ui"

// Clean subpath import
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@mivama/ui/pagination"
```

### Purpose

Navigation controls for splitting large datasets or item lists across multiple sequential pages.

### Render Environment

Server-safe component (zero client JavaScript overhead; standard semantic links and buttons).

### Accessibility & Keyboard Interaction

Nav with aria-label='pagination'; active page marked with aria-current='page'; previous/next controls clearly labeled.

### Variants & States

States: active page, inactive link, disabled previous/next, ellipsis.

### Minimal Example

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@mivama/ui/pagination"

export function PageBar() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#prev" /></PaginationItem>
        <PaginationItem><PaginationLink href="#1" isActive>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#next" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

---

## Progress (progress)

### Import

```tsx
// Root barrel import
import { Progress } from "@mivama/ui"

// Clean subpath import
import { Progress } from "@mivama/ui/progress"
```

### Purpose

Visual progress bar communicating completion percentage of a task or ongoing background process.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Role='progressbar'; aria-valuenow reflects current percentage (0-100), aria-valuemin='0', aria-valuemax='100'.

### Variants & States

Sizes: default (h-2), sm (h-1), lg (h-3). States: determinate (0-100%), indeterminate (animated pulse).

### Minimal Example

```tsx
import { Progress } from "@mivama/ui/progress"

export function UploadProgress() {
  return <Progress value={65} aria-label="Upload progress" />
}
```

---

## RadioGroup (radio-group)

### Import

```tsx
// Root barrel import
import { RadioGroup, RadioGroupItem } from "@mivama/ui"

// Clean subpath import
import { RadioGroup, RadioGroupItem } from "@mivama/ui/radio-group"
```

### Purpose

Mutually exclusive selection set allowing users to choose exactly one option from a group of items.

### Render Environment

Client component ("use client") built on Base UI Radio Group with roving tabindex.

### Accessibility & Keyboard Interaction

Role='radiogroup'; ArrowUp/Down and Left/Right navigate options; aria-checked marks the selected radio.

### Variants & States

Orientations: vertical (default), horizontal. States: unchecked, checked, disabled, error.

### Minimal Example

```tsx
import { RadioGroup, RadioGroupItem } from "@mivama/ui/radio-group"
import { Label } from "@mivama/ui/label"

export function PlanSelector() {
  return (
    <RadioGroup defaultValue="starter">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="starter" id="starter" />
        <Label htmlFor="starter">Starter Plan</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pro" id="pro" />
        <Label htmlFor="pro">Pro Plan</Label>
      </div>
    </RadioGroup>
  )
}
```

---

## ScrollScene (scroll-scene)

### Import

```tsx
// Root barrel import
import { ScrollScene, ScrollLayer } from "@mivama/ui"

// Clean subpath import
import { ScrollScene, ScrollLayer } from "@mivama/ui/scroll-scene"
```

### Purpose

Server-compatible scroll-driven animation primitive for reveals and parallax effects.

### Render Environment

Server-safe component (zero client JavaScript overhead; uses CSS scroll timelines with static fallback).

### Accessibility & Keyboard Interaction

Respects prefers-reduced-motion media query by rendering static full layouts without scroll-linked displacement.

### Variants & States

Effects: reveal, parallax, sticky header.

### Minimal Example

```tsx
import { ScrollScene, ScrollLayer } from "@mivama/ui/scroll-scene"

export function HeroScroll() {
  return (
    <ScrollScene>
      <ScrollLayer speed={0.5}><h1>Parallax Title</h1></ScrollLayer>
    </ScrollScene>
  )
}
```

---

## Section (section)

### Import

```tsx
// Root barrel import
import { Section } from "@mivama/ui"

// Clean subpath import
import { Section } from "@mivama/ui/section"
```

### Purpose

Semantic vertical section container applying rhythmic padding and tone backgrounds across page layouts.

### Render Environment

Server-safe component (zero client JavaScript overhead).

### Accessibility & Keyboard Interaction

Renders semantic section element; supports aria-label or aria-labelledby for section landmark navigation.

### Variants & States

Tones: default (background), muted, brand, inverted. Spacings: default, compact, roomy.

### Minimal Example

```tsx
import { Section } from "@mivama/ui/section"

export function FeatureSection() {
  return (
    <Section tone="muted" spacing="default">
      <h2>Section Content</h2>
    </Section>
  )
}
```

---

## Select (select)

### Import

```tsx
// Root barrel import
import { Select } from "@mivama/ui"

// Clean subpath import
import { Select } from "@mivama/ui/select"
```

### Purpose

Rich dropdown selection control for picking single values from styled option menus.

### Render Environment

Server-safe component with native HTML select semantics and design system styling.

### Accessibility & Keyboard Interaction

Full native dropdown keyboard interactions (Alt+Down, Up/Down, Type-ahead search) and touch UI support.

### Variants & States

States: default, focus, disabled, error.

### Minimal Example

```tsx
import { Select } from "@mivama/ui/select"

export function RoleSelect() {
  return (
    <Select defaultValue="member">
      <option value="admin">Admin</option>
      <option value="member">Member</option>
    </Select>
  )
}
```

---

## Separator (separator)

### Import

```tsx
// Root barrel import
import { Separator } from "@mivama/ui"

// Clean subpath import
import { Separator } from "@mivama/ui/separator"
```

### Purpose

Horizontal or vertical visual divider line separating distinct content groups.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Role='separator'; aria-orientation set to 'horizontal' or 'vertical'; aria-hidden='true' when purely decorative.

### Variants & States

Orientations: horizontal (default), vertical.

### Minimal Example

```tsx
import { Separator } from "@mivama/ui/separator"

export function Divider() {
  return <Separator className="my-4" />
}
```

---

## Sheet (sheet)

### Import

```tsx
// Root barrel import
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetOverlay, SheetPortal } from "@mivama/ui"

// Clean subpath import
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetOverlay, SheetPortal } from "@mivama/ui/sheet"
```

### Purpose

Slide-over drawer panel extending from screen edges, ideal for navigation menus, filters, and editing sidebars.

### Render Environment

Client component ("use client") built on Base UI Dialog primitive with side-sliding animations and portal rendering.

### Accessibility & Keyboard Interaction

Role='dialog' with aria-modal='true'; traps focus while open; Escape dismisses; portaled to MivamaProvider container.

### Variants & States

Sides: right (default), left, top, bottom. Sizes: sm (max-w-sm), md (max-w-lg), full. States: open, closed.

### Minimal Example

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@mivama/ui/sheet"
import { Button } from "@mivama/ui/button"

export function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Settings</Button></SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>Update your workspace settings.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
```

---

## Sidebar (sidebar)

### Import

```tsx
// Root barrel import
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarRail, SidebarInset, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarSeparator, useSidebar } from "@mivama/ui"

// Clean subpath import
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarRail, SidebarInset, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarSeparator, useSidebar } from "@mivama/ui/sidebar"
```

### Purpose

Full-featured, responsive collapsible application sidebar with keyboard shortcuts, mobile sheet drawer, and submenus.

### Render Environment

Client component ("use client") managing open/collapsed state, cookie persistence, and mobile breakpoints.

### Accessibility & Keyboard Interaction

Nav element with aria-label; SidebarTrigger and Rail expose aria-expanded; keyboard shortcut (Ctrl/Cmd+B) toggles collapse.

### Variants & States

Variants: sidebar, floating, inset. Collapsible modes: offcanvas, icon, none. States: expanded, collapsed, mobile.

### Minimal Example

```tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@mivama/ui/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar><SidebarHeader><SidebarTrigger /></SidebarHeader><SidebarContent>Menu items</SidebarContent></Sidebar>
      <main className="flex-1 p-6">{children}</main>
    </SidebarProvider>
  )
}
```

---

## Skeleton (skeleton)

### Import

```tsx
// Root barrel import
import { Skeleton } from "@mivama/ui"

// Clean subpath import
import { Skeleton } from "@mivama/ui/skeleton"
```

### Purpose

Pulsing placeholder placeholder block mimicking the shape of content while asynchronous data is loading.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Marked aria-hidden='true' by default to avoid reading raw placeholder shapes; container should have aria-busy='true'.

### Variants & States

Supports arbitrary width and height via Tailwind utility classes. States: pulsing animation.

### Minimal Example

```tsx
import { Skeleton } from "@mivama/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
}
```

---

## Spinner (spinner)

### Import

```tsx
// Root barrel import
import { Spinner } from "@mivama/ui"

// Clean subpath import
import { Spinner } from "@mivama/ui/spinner"
```

### Purpose

Animated spinning indicator communicating that a background action, calculation, or network call is in progress.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Exposes role='status' with an internal screen reader label 'Loading...' by default; aria-hidden when paired with visible text.

### Variants & States

Sizes: default (h-4 w-4), sm (h-3 w-3), lg (h-6 w-6). States: spinning.

### Minimal Example

```tsx
import { Spinner } from "@mivama/ui/spinner"

export function LoadingNotice() {
  return <div className="flex items-center gap-2"><Spinner /><span>Processing...</span></div>
}
```

---

## Switch (switch)

### Import

```tsx
// Root barrel import
import { Switch } from "@mivama/ui"

// Clean subpath import
import { Switch } from "@mivama/ui/switch"
```

### Purpose

Toggle control allowing users to turn a single setting or state immediately on or off.

### Render Environment

Client component ("use client") built on Base UI Switch primitive.

### Accessibility & Keyboard Interaction

Role='switch'; aria-checked reflects on/off state; Space and Enter toggle value; requires accessible name via label or aria-label.

### Variants & States

States: unchecked (off), checked (on), disabled, focus-visible.

### Minimal Example

```tsx
import { Switch } from "@mivama/ui/switch"
import { Label } from "@mivama/ui/label"

export function AirplaneModeToggle() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

---

## Tabs (tabs)

### Import

```tsx
// Root barrel import
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mivama/ui"

// Clean subpath import
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mivama/ui/tabs"
```

### Purpose

Organizes related content into multiple tabbed panels where only one panel is visible at a time.

### Render Environment

Client component ("use client") built on Base UI Tabs primitive with roving tabindex.

### Accessibility & Keyboard Interaction

Role='tablist', role='tab', and role='tabpanel'; ArrowLeft/Right navigate between tabs; Home/End jump to first/last; aria-selected reflects active tab.

### Variants & States

Orientations: horizontal (default), vertical. States: active tab, inactive tab, disabled.

### Minimal Example

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mivama/ui/tabs"

export function AccountTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account details form.</TabsContent>
      <TabsContent value="password">Change password form.</TabsContent>
    </Tabs>
  )
}
```

---

## Textarea (textarea)

### Import

```tsx
// Root barrel import
import { Textarea } from "@mivama/ui"

// Clean subpath import
import { Textarea } from "@mivama/ui/textarea"
```

### Purpose

Multi-line text input field for long-form comments, descriptions, or message composition.

### Render Environment

Server-safe component (zero client JavaScript overhead; standard HTML textarea).

### Accessibility & Keyboard Interaction

Supports aria-invalid, aria-describedby, and disabled; clear focus ring tokens.

### Variants & States

States: default, focus, disabled, error. Resize modes: vertical, none.

### Minimal Example

```tsx
import { Textarea } from "@mivama/ui/textarea"

export function FeedbackInput() {
  return <Textarea placeholder="Share your feedback here..." rows={4} />
}
```

---

## Tooltip (tooltip)

### Import

```tsx
// Root barrel import
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@mivama/ui"

// Clean subpath import
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@mivama/ui/tooltip"
```

### Purpose

Informative popover revealing a brief text hint when hovering or focusing an interactive element.

### Render Environment

Client component ("use client") built on Base UI Tooltip with collision detection and portal rendering.

### Accessibility & Keyboard Interaction

Role='tooltip'; triggered on mouse enter and keyboard focus; dismisses on Escape; portaled to MivamaProvider container.

### Variants & States

Sides: top (default), right, bottom, left. States: closed, open.

### Minimal Example

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@mivama/ui/tooltip"
import { Button } from "@mivama/ui/button"

export function SaveButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Save</Button></TooltipTrigger>
        <TooltipContent><p>Save changes to cloud</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

## Typography (typography)

### Import

```tsx
// Root barrel import
import { Heading, Text, Eyebrow } from "@mivama/ui"

// Clean subpath import
import { Heading, Text, Eyebrow } from "@mivama/ui/typography"
```

### Purpose

Consistent typographic hierarchy primitives ensuring semantic heading tags and scalable font sizes.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Supports render prop to decouple visual typography style from semantic heading levels (h1-h6).

### Variants & States

Heading variants: display, title, headline, subhead, statement. Text variants: body, lead, caption, muted. Tones: default, muted, brand, inherit.

### Minimal Example

```tsx
import { Heading, Text, Eyebrow } from "@mivama/ui/typography"

export function HeroHeading() {
  return (
    <div>
      <Eyebrow>New Release</Eyebrow>
      <Heading variant="display" render={<h1 />}>Antigravity Platform</Heading>
      <Text variant="lead">Autonomous developer workflows built for scale.</Text>
    </div>
  )
}
```

---

## Forms (forms)

### Import

```tsx
// Root barrel import
import { Field, Input, Textarea, Select, Choice, ChoiceGroup, FieldLabel, FieldDescription, FieldError, Fieldset, FieldLegend } from "@mivama/ui"

// Clean subpath import
import { Field, Input, Textarea, Select, Choice, ChoiceGroup, FieldLabel, FieldDescription, FieldError, Fieldset, FieldLegend } from "@mivama/ui/forms"
```

### Purpose

Consolidated convenience barrel re-exporting form primitives for rapid form construction without multiple imports.

### Render Environment

Server-safe component aggregate; contains server-safe form building blocks.

### Accessibility & Keyboard Interaction

Comprehensive label-to-control association, error announcements, fieldset grouping, and field descriptions.

### Variants & States

Aggregates all variants and states of Field, Input, Textarea, Select, and Choice.

### Minimal Example

```tsx
import { Field, FieldLabel, Input, FieldError } from "@mivama/ui/forms"

export function LoginForm() {
  return (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" required />
    </Field>
  )
}
```

---

## DropdownMenu (dropdown-menu)

### Import

```tsx
// Root barrel import
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup } from "@mivama/ui"

// Clean subpath import
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup } from "@mivama/ui/dropdown-menu"
```

### Purpose

Action menu revealed when clicking a trigger button, presenting a list of commands, shortcuts, and submenus.

### Render Environment

Client component ("use client") built on Base UI Menu with floating portal positioning.

### Accessibility & Keyboard Interaction

Role='menu' and role='menuitem'; ArrowUp/Down navigation, Enter to activate, Escape to close; portaled to MivamaProvider root.

### Variants & States

Items: standard item, destructive item, checkbox item, radio group item, nested submenu. States: open, closed, disabled.

### Minimal Example

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@mivama/ui/dropdown-menu"
import { Button } from "@mivama/ui/button"

export function OptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Options</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Popover (popover)

### Import

```tsx
// Root barrel import
import { Popover, PopoverTrigger, PopoverContent, PopoverPortal, PopoverAnchor } from "@mivama/ui"

// Clean subpath import
import { Popover, PopoverTrigger, PopoverContent, PopoverPortal, PopoverAnchor } from "@mivama/ui/popover"
```

### Purpose

Floating non-modal overlay displaying rich custom content when an anchor trigger is clicked.

### Render Environment

Client component ("use client") built on Base UI Popover with collision-aware positioning.

### Accessibility & Keyboard Interaction

Role='dialog' or 'region'; aria-expanded toggles on trigger; focus moves to popover content on open; Escape closes.

### Variants & States

Alignments: start, center, end. Sides: top, right, bottom, left. States: open, closed.

### Minimal Example

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@mivama/ui/popover"
import { Button } from "@mivama/ui/button"

export function InfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Details</Button></PopoverTrigger>
      <PopoverContent className="w-80"><p className="text-sm">Additional detailed configuration parameters.</p></PopoverContent>
    </Popover>
  )
}
```

---

## Accordion (accordion)

### Import

```tsx
// Root barrel import
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mivama/ui"

// Clean subpath import
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mivama/ui/accordion"
```

### Purpose

Vertically stacked interactive disclosure headings that expand and collapse associated content sections.

### Render Environment

Client component ("use client") built on Base UI Accordion primitive.

### Accessibility & Keyboard Interaction

Trigger is a button with aria-expanded; panel is region linked via aria-controls; Enter/Space toggles disclosure; Arrow navigation supported.

### Variants & States

Modes: single (one panel open at a time), multiple. States: collapsed, expanded, disabled.

### Minimal Example

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mivama/ui/accordion"

export function Faq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres strictly to WAI-ARIA design patterns.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

---

## Collapsible (collapsible)

### Import

```tsx
// Root barrel import
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mivama/ui"

// Clean subpath import
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mivama/ui/collapsible"
```

### Purpose

Interactive disclosure primitive allowing users to show or hide a single section of secondary content.

### Render Environment

Client component ("use client") built on Base UI Collapsible primitive.

### Accessibility & Keyboard Interaction

Trigger has aria-expanded; content region has matching ID and aria-hidden when closed; keyboard accessible.

### Variants & States

States: open, closed, disabled.

### Minimal Example

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mivama/ui/collapsible"
import { Button } from "@mivama/ui/button"

export function ToggleDetails() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild><Button variant="ghost">Show more</Button></CollapsibleTrigger>
      <CollapsibleContent className="p-2 border rounded-md">Hidden details unveiled.</CollapsibleContent>
    </Collapsible>
  )
}
```

---

## Avatar (avatar)

### Import

```tsx
// Root barrel import
import { Avatar, AvatarImage, AvatarFallback } from "@mivama/ui"

// Clean subpath import
import { Avatar, AvatarImage, AvatarFallback } from "@mivama/ui/avatar"
```

### Purpose

Visual representation of a user or entity showing a profile image with graceful text fallback.

### Render Environment

Client component ("use client") built on Base UI Avatar primitive with image loading lifecycle handling.

### Accessibility & Keyboard Interaction

AvatarImage exposes alt text; AvatarFallback renders initials or icon when image is loading or fails to load.

### Variants & States

Sizes: default (h-10 w-10), sm (h-8 w-8), lg (h-12 w-12). States: loading, error fallback, loaded image.

### Minimal Example

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@mivama/ui/avatar"

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="/avatar.png" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
```

---

## Table (table)

### Import

```tsx
// Root barrel import
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@mivama/ui"

// Clean subpath import
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@mivama/ui/table"
```

### Purpose

Semantic tabular data presentation primitives styled with standard borders, padding, and hover states.

### Render Environment

Server-safe component (zero client JavaScript runtime overhead; fully renders to static HTML in React Server Components).

### Accessibility & Keyboard Interaction

Semantic HTML table markup (table, thead, tbody, tr, th scope='col', td, caption); accessible to screen readers natively.

### Variants & States

States: default, row hover, row selected.

### Minimal Example

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@mivama/ui/table"

export function InvoiceTable() {
  return (
    <Table>
      <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>
      <TableBody><TableRow><TableCell>INV-001</TableCell><TableCell>$250.00</TableCell></TableRow></TableBody>
    </Table>
  )
}
```

---

## Toast (toast)

### Import

```tsx
// Root barrel import
import { Toast, Toaster, useToast, toast } from "@mivama/ui"

// Clean subpath import
import { Toast, Toaster, useToast, toast } from "@mivama/ui/toast"
```

### Purpose

Temporary floating notification toasts communicating brief asynchronous feedback or system events.

### Render Environment

Client component ("use client") managing global toast queue, timer auto-dismissal, and swipe gestures.

### Accessibility & Keyboard Interaction

Renders into an aria-live='polite' landmark; destructive toasts use aria-live='assertive'; focusable action buttons.

### Variants & States

Variants: default, destructive. States: visible, dismissing, action button focused.

### Minimal Example

```tsx
import { Button } from "@mivama/ui/button"
import { toast } from "@mivama/ui/toast"

export function NotifyButton() {
  return (
    <Button onClick={() => toast({ title: "Saved", description: "Changes recorded." })}>
      Save Changes
    </Button>
  )
}
```

---

## AlertDialog (alert-dialog)

### Import

```tsx
// Root barrel import
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@mivama/ui"

// Clean subpath import
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@mivama/ui/alert-dialog"
```

### Purpose

Modal confirmation dialog for destructive or critical actions that require explicit user affirmation before continuing.

### Render Environment

Client component ("use client") built on Base UI Dialog primitive with focus entrapment and alertdialog role.

### Accessibility & Keyboard Interaction

Role='alertdialog'; aria-modal='true'; initial focus is placed on the cancel button to prevent accidental confirmation; Escape closes.

### Variants & States

States: open, closed. Action buttons: default, destructive.

### Minimal Example

```tsx
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@mivama/ui/alert-dialog"
import { Button } from "@mivama/ui/button"

export function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="destructive">Delete Project</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Slider (slider)

### Import

```tsx
// Root barrel import
import { Slider } from "@mivama/ui"

// Clean subpath import
import { Slider } from "@mivama/ui/slider"
```

### Purpose

Continuous or stepped range slider control allowing users to select a numeric value within bounded limits.

### Render Environment

Client component ("use client") built on Base UI Slider primitive with mouse and touch drag handling.

### Accessibility & Keyboard Interaction

Role='slider'; aria-valuemin, aria-valuemax, aria-valuenow; ArrowLeft/Down decreases, ArrowRight/Up increases; PageUp/PageDown jumps.

### Variants & States

States: default, hover, active drag, disabled, focus-visible.

### Minimal Example

```tsx
import { Slider } from "@mivama/ui/slider"

export function VolumeSlider() {
  return <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
}
```

---

## ScrollArea (scroll-area)

### Import

```tsx
// Root barrel import
import { ScrollArea, ScrollBar } from "@mivama/ui"

// Clean subpath import
import { ScrollArea, ScrollBar } from "@mivama/ui/scroll-area"
```

### Purpose

Custom scrollable container replacing native browser scrollbars with unobtrusive, styled scroll indicators.

### Render Environment

Client component ("use client") built on Base UI Scroll Area primitive.

### Accessibility & Keyboard Interaction

Preserves native keyboard scrolling (PageUp, PageDown, Arrow keys) and native wheel events; scrollbar thumbs are keyboard navigable.

### Variants & States

Orientations: vertical (default), horizontal, both. States: resting, hover visible, scrolling.

### Minimal Example

```tsx
import { ScrollArea } from "@mivama/ui/scroll-area"

export function ScrollableList({ items }: { items: string[] }) {
  return (
    <ScrollArea className="h-48 w-48 rounded-md border p-4">
      {items.map((item, i) => <div key={i}>{item}</div>)}
    </ScrollArea>
  )
}
```

---

## Toggle (toggle)

### Import

```tsx
// Root barrel import
import { Toggle, toggleVariants } from "@mivama/ui"

// Clean subpath import
import { Toggle, toggleVariants } from "@mivama/ui/toggle"
```

### Purpose

Two-state button that can be toggled on or off, frequently used in text formatting toolbars.

### Render Environment

Client component ("use client") built on Base UI Toggle primitive.

### Accessibility & Keyboard Interaction

Role='button' with aria-pressed='true' | 'false'; Space and Enter toggle state; 44px min target size by default.

### Variants & States

Variants: default, outline. Sizes: default, sm, lg. States: unpressed, pressed, disabled.

### Minimal Example

```tsx
import { Toggle } from "@mivama/ui/toggle"
import { Bold } from "lucide-react"

export function BoldToggle() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
```

---

## ToggleGroup (toggle-group)

### Import

```tsx
// Root barrel import
import { ToggleGroup, ToggleGroupItem } from "@mivama/ui"

// Clean subpath import
import { ToggleGroup, ToggleGroupItem } from "@mivama/ui/toggle-group"
```

### Purpose

Set of related two-state buttons styled together, supporting single or multiple selections.

### Render Environment

Client component ("use client") built on Base UI Toggle Group primitive with roving focus.

### Accessibility & Keyboard Interaction

Role='group'; items expose aria-pressed; roving keyboard arrow navigation across toggle buttons.

### Variants & States

Selection types: single, multiple. Variants: default, outline. Sizes: default, sm, lg.

### Minimal Example

```tsx
import { ToggleGroup, ToggleGroupItem } from "@mivama/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"

export function FormattingToolbar() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  )
}
```

---

## Resizable (resizable)

### Import

```tsx
// Root barrel import
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@mivama/ui"

// Clean subpath import
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@mivama/ui/resizable"
```

### Purpose

Accessible multi-panel layout with draggable, keyboard-operable splitter divider handles.

### Render Environment

Client component ("use client") built on react-resizable-panels with keyboard operation and persistence.

### Accessibility & Keyboard Interaction

Role='separator'; separator has tabindex='0'; keyboard ArrowLeft/Right (or Up/Down) adjusts panel size by delta; Home/End collapse/expand.

### Variants & States

Orientations: horizontal (default), vertical. States: resting, hover handle, dragging handle, collapsed.

### Minimal Example

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@mivama/ui/resizable"

export function SplitLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] border rounded-lg">
      <ResizablePanel defaultSize={30}>Left pane</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>Right content</ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

---

## DataTable (data-table)

### Import

```tsx
// Root barrel import
import { DataTable, DataTableColumnHeader, DataTablePagination, DataTableViewOptions } from "@mivama/ui"

// Clean subpath import
import { DataTable, DataTableColumnHeader, DataTablePagination, DataTableViewOptions } from "@mivama/ui/data-table"
```

### Purpose

Feature-complete data table adapter integrating @tanstack/react-table v9 with Mivama Table, Input, and Pagination.

### Render Environment

Client component ("use client") providing state orchestration for sorting, filtering, selection, and pagination.

### Accessibility & Keyboard Interaction

Semantic table markup with accessible sort buttons, clear column headers, pagination controls, and row selection checkboxes.

### Variants & States

States: loading skeleton, empty records, filtered results, sorted columns, paginated views.

### Minimal Example

```tsx
import { DataTable } from "@mivama/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"

interface User { id: string; name: string }
const columns: ColumnDef<User>[] = [{ accessorKey: "name", header: "Name" }]

export function UsersTable({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} />
}
```

---

## Chart (chart)

### Import

```tsx
// Root barrel import
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle } from "@mivama/ui"

// Clean subpath import
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle } from "@mivama/ui/chart"
```

### Purpose

Accessible charting wrapper for recharts charts with semantic theme-aware token mapping and styled tooltips.

### Render Environment

Client component ("use client") managing recharts responsive container and design token color variables.

### Accessibility & Keyboard Interaction

Exposes role='region' with descriptive aria-label; tooltip content is structured for assistive inspection; color-blind accessible token scales.

### Variants & States

Supports all standard Recharts charts (Bar, Line, Area, Pie, Radar). States: normal, hover tooltip, active legend.

### Minimal Example

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@mivama/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const config = { desktop: { label: "Desktop", color: "var(--primary)" } } satisfies ChartConfig
const data = [{ month: "Jan", desktop: 186 }]

export function MonthlyChart() {
  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

---

## Questionnaire (questionnaire)

### Import

```tsx
// Root barrel import
import { Questionnaire, QuestionnaireStep, QuestionnaireQuestion, QuestionnaireActions } from "@mivama/ui"

// Clean subpath import
import { Questionnaire, QuestionnaireStep, QuestionnaireQuestion, QuestionnaireActions } from "@mivama/ui/questionnaire"
```

### Purpose

Accessible multi-step questionnaire and onboarding flow coordinating step indicators, questions, and action buttons.

### Render Environment

Client component ("use client") managing step transitions, answer validation, and progress announcements.

### Accessibility & Keyboard Interaction

Nav step list with aria-current='step'; questions formatted as semantic fieldsets; errors announce via role='alert'; buttons have explicit type='button'.

### Variants & States

States: active step, completed step, validation error, submission pending.

### Minimal Example

```tsx
import { Questionnaire, QuestionnaireStep, QuestionnaireQuestion, QuestionnaireActions } from "@mivama/ui/questionnaire"
import { Button } from "@mivama/ui/button"

export function OnboardingFlow() {
  return (
    <Questionnaire steps={[{ id: "s1", title: "Profile" }, { id: "s2", title: "Team" }]}>
      <QuestionnaireStep stepIndex={0}>
        <QuestionnaireQuestion title="What is your role?" />
        <QuestionnaireActions>
          <Button type="button">Next Step</Button>
        </QuestionnaireActions>
      </QuestionnaireStep>
    </Questionnaire>
  )
}
```

---

