import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../src/components/ui/dropdown-menu.js"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "../../src/components/ui/popover.js"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../src/components/ui/accordion.js"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../src/components/ui/collapsible.js"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "../../src/components/ui/avatar.js"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../src/components/ui/table.js"
import {
  toast,
  Toaster,
  ToastRootProvider,
} from "../../src/components/ui/toast.js"

describe("Phase 2 components", () => {
  it("renders and interacts with DropdownMenu", async () => {
    const user = userEvent.setup()
    render(
      <MivamaProvider>
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Actions" })
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByText("Options")).toBeInTheDocument()
      expect(screen.getByText("Edit")).toBeInTheDocument()
      expect(screen.getByText("Delete")).toBeInTheDocument()
    })
  })

  it("renders and interacts with Popover", async () => {
    const user = userEvent.setup()
    render(
      <MivamaProvider>
        <Popover>
          <PopoverTrigger>Open Info</PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Information</PopoverTitle>
            <PopoverDescription>Details go here.</PopoverDescription>
            <PopoverClose>Close</PopoverClose>
          </PopoverContent>
        </Popover>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Open Info" })
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByText("Information")).toBeInTheDocument()
      expect(screen.getByText("Details go here.")).toBeInTheDocument()
    })

    const closeBtn = screen.getByRole("button", { name: "Close" })
    await user.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByText("Information")).not.toBeInTheDocument()
    })
  })

  it("renders and expands Accordion", async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole("button", { name: "Section 1" })
    expect(trigger).toBeInTheDocument()

    await user.click(trigger)
    await waitFor(() => {
      expect(screen.getByText("Content 1")).toBeInTheDocument()
    })
  })

  it("renders and expands Collapsible", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle Collapsible</CollapsibleTrigger>
        <CollapsibleContent>Collapsible Hidden Content</CollapsibleContent>
      </Collapsible>
    )

    const trigger = screen.getByRole("button", { name: "Toggle Collapsible" })
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByText("Collapsible Hidden Content")).toBeInTheDocument()
    })
  })

  it("renders Avatar and AvatarFallback with AvatarGroup", () => {
    render(
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="/test.jpg" alt="User test" />
          <AvatarFallback>UT</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    )

    expect(screen.getByText("UT")).toBeInTheDocument()
    expect(screen.getByText("AB")).toBeInTheDocument()
  })

  it("renders semantic Table structure correctly", () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText("Test Caption")).toBeInTheDocument()
    expect(screen.getByText("Header Col")).toBeInTheDocument()
    expect(screen.getByText("Cell Data")).toBeInTheDocument()
  })

  it("triggers and renders Toast notifications", async () => {
    const user = userEvent.setup()
    render(
      <ToastRootProvider>
        <button
          type="button"
          onClick={() =>
            toast({
              title: "Notification Sent",
              description: "Everything worked.",
            })
          }
        >
          Send Toast
        </button>
      </ToastRootProvider>
    )

    const btn = screen.getByRole("button", { name: "Send Toast" })
    await user.click(btn)

    await waitFor(() => {
      expect(screen.getByText("Notification Sent")).toBeInTheDocument()
      expect(screen.getByText("Everything worked.")).toBeInTheDocument()
    })
  })
})
