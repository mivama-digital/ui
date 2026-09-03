import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it, vi } from "vitest"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  Fieldset,
} from "../../src/components/ui/field.js"
import { Input } from "../../src/components/ui/input.js"
import { Select } from "../../src/components/ui/select.js"
import { Switch } from "../../src/components/ui/switch.js"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../src/components/ui/tabs.js"
import { Textarea } from "../../src/components/ui/textarea.js"

describe("tabs, switch, and form primitives", () => {
  it("supports manual keyboard tab activation and exposes the active panel", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings sections">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="security">Security settings</TabsContent>
      </Tabs>
    )

    const accountTab = screen.getByRole("tab", { name: "Account" })
    const securityTab = screen.getByRole("tab", { name: "Security" })

    expect(accountTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account settings")

    accountTab.focus()
    await user.keyboard("{ArrowRight}")
    expect(securityTab).toHaveFocus()
    expect(securityTab).toHaveAttribute("aria-selected", "false")

    await user.keyboard("{Enter}")
    expect(securityTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security settings")

    const results = await axe.run(screen.getByRole("tablist").parentElement!)
    expect(results.violations).toEqual([])
  })

  it("toggles a switch and reports checked and disabled state", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()

    const { unmount } = render(
      <Switch aria-label="Enable alerts" onCheckedChange={onCheckedChange} />
    )

    const toggle = screen.getByRole("switch", { name: "Enable alerts" })
    expect(toggle).not.toBeChecked()

    await user.click(toggle)
    expect(toggle).toBeChecked()
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())

    unmount()
    render(<Switch aria-label="Disabled alerts" disabled defaultChecked />)

    const disabledToggle = screen.getByRole("switch", {
      name: "Disabled alerts",
    })
    expect(disabledToggle).toHaveAttribute("aria-disabled", "true")
    expect(disabledToggle).toHaveAttribute("tabindex", "-1")

    const results = await axe.run(disabledToggle)
    expect(results.violations).toEqual([])
  })

  it("connects labels, descriptions, errors, and disabled fieldsets", async () => {
    render(
      <Fieldset disabled>
        <FieldLegend>Profile</FieldLegend>
        <Field>
          <FieldLabel htmlFor="display-name">Display name</FieldLabel>
          <Input
            id="display-name"
            aria-describedby="display-name-description display-name-error"
            aria-invalid="true"
          />
          <FieldDescription id="display-name-description">
            Shown to other team members.
          </FieldDescription>
          <FieldError id="display-name-error">
            A display name is required.
          </FieldError>
        </Field>
      </Fieldset>
    )

    const input = screen.getByRole("textbox", { name: "Display name" })
    expect(input).toBeDisabled()
    expect(input).toHaveAccessibleDescription(
      "Shown to other team members. A display name is required."
    )
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("group", { name: "Profile" })).toBeDisabled()

    const results = await axe.run(
      screen.getByRole("group", { name: "Profile" })
    )
    expect(results.violations).toEqual([])
  })

  it("automatically binds id, description, and invalid state via FieldContext", async () => {
    render(
      <div>
        <Field id="test-input-field" isInvalid isRequired>
          <FieldLabel>Full Name</FieldLabel>
          <Input />
          <FieldDescription>First and last name.</FieldDescription>
          <FieldError>Full name is required.</FieldError>
        </Field>

        <Field id="test-select-field">
          <FieldLabel>Role</FieldLabel>
          <Select aria-label="Role">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <FieldDescription>Choose your access role.</FieldDescription>
        </Field>

        <Field id="test-textarea-field" isInvalid>
          <FieldLabel>Biography</FieldLabel>
          <Textarea />
          <FieldError>Bio cannot be empty.</FieldError>
        </Field>
      </div>
    )

    const input = screen.getByRole("textbox", { name: "Full Name" })
    expect(input).toHaveAttribute("id", "test-input-field")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription(
      "First and last name. Full name is required."
    )

    const select = screen.getByRole("combobox", { name: "Role" })
    expect(select).toHaveAttribute("id", "test-select-field")
    expect(select).toHaveAccessibleDescription("Choose your access role.")
    expect(select).not.toHaveAttribute("aria-invalid")

    const textarea = screen.getByRole("textbox", { name: "Biography" })
    expect(textarea).toHaveAttribute("id", "test-textarea-field")
    expect(textarea).toHaveAttribute("aria-invalid", "true")
    expect(textarea).toHaveAccessibleDescription("Bio cannot be empty.")
  })

  it("renders standalone inputs, selects, and textareas without FieldContext", () => {
    render(
      <div>
        <Input placeholder="Standalone input" />
        <Select aria-label="Standalone select">
          <option>Option</option>
        </Select>
        <Textarea placeholder="Standalone textarea" />
      </div>
    )

    expect(screen.getByPlaceholderText("Standalone input")).toBeInTheDocument()
    expect(
      screen.getByRole("combobox", { name: "Standalone select" })
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Standalone textarea")
    ).toBeInTheDocument()
  })
})
