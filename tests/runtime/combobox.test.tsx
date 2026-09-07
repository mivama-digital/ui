import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it, vi } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../src/components/ui/combobox.js"

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
]

function ComboboxFixture({
  portal,
  onValueChange,
  defaultValue,
}: {
  portal?: HTMLElement
  onValueChange?: (val: any) => void
  defaultValue?: string
}) {
  return (
    <MivamaProvider portalContainer={portal}>
      <Combobox
        items={options}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <ComboboxInput
          placeholder="Select fruit..."
          aria-label="Select fruit"
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          <ComboboxList>
            {(opt: (typeof options)[number]) => (
              <ComboboxItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </MivamaProvider>
  )
}

describe("Combobox primitive", () => {
  it("renders input, opens popup on click or focus, and passes axe", async () => {
    const user = userEvent.setup()
    const { container } = render(<ComboboxFixture />)

    const input = screen.getByRole("combobox", { name: "Select fruit" })
    expect(input).toBeInTheDocument()

    await user.click(input)

    const listbox = await screen.findByRole("listbox")
    expect(listbox).toBeInTheDocument()
    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("filters items when typing a query and shows empty message", async () => {
    const user = userEvent.setup()
    render(<ComboboxFixture />)

    const input = screen.getByRole("combobox", { name: "Select fruit" })
    await user.type(input, "xyz")

    await waitFor(() => {
      expect(screen.queryByText("Apple")).toBeNull()
      expect(screen.queryByText("Banana")).toBeNull()
      expect(screen.getByText("No fruits found.")).toBeInTheDocument()
    })
  })

  it("selects an item upon click", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ComboboxFixture onValueChange={onValueChange} />)

    const input = screen.getByRole("combobox", { name: "Select fruit" })
    await user.click(input)

    const apple = await screen.findByText("Apple")
    await user.click(apple)

    expect(onValueChange).toHaveBeenCalledWith("apple", expect.anything())
  })

  it("supports keyboard navigation with ArrowDown and Enter", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ComboboxFixture onValueChange={onValueChange} />)

    const input = screen.getByRole("combobox", { name: "Select fruit" })
    await user.click(input)
    await user.keyboard("{ArrowDown}")
    await user.keyboard("{Enter}")

    expect(onValueChange).toHaveBeenCalledWith("apple", expect.anything())
  })

  it("disables option with disabled prop", async () => {
    const user = userEvent.setup()
    render(<ComboboxFixture />)

    const input = screen.getByRole("combobox", { name: "Select fruit" })
    await user.click(input)

    const cherry = await screen.findByText("Cherry")
    expect(cherry.closest("[data-slot=combobox-item]")).toHaveAttribute(
      "data-disabled",
      ""
    )
  })

  it("respects MivamaProvider portalContainer", async () => {
    const user = userEvent.setup()
    const customPortal = document.createElement("div")
    customPortal.id = "custom-combobox-portal"
    document.body.appendChild(customPortal)

    try {
      render(<ComboboxFixture portal={customPortal} />)
      const input = screen.getByRole("combobox", { name: "Select fruit" })
      await user.click(input)

      const listbox = await screen.findByRole("listbox")
      expect(customPortal.contains(listbox)).toBe(true)
    } finally {
      customPortal.remove()
    }
  })
})
