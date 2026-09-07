import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../src/components/ui/input-otp.js"

beforeAll(() => {
  document.elementFromPoint = () => null
})

afterAll(() => {
  delete (document as any).elementFromPoint
})

function InputOTPFixture({
  onComplete,
  disabled = false,
  defaultValue,
  value,
  onChange,
}: {
  onComplete?: (val: string) => void
  disabled?: boolean
  defaultValue?: string
  value?: string
  onChange?: (val: string) => void
}) {
  const otpProps: any = {
    id: "otp-input",
    maxLength: 6,
    disabled,
    onComplete,
    "aria-label": "Verification Code",
  }
  if (value !== undefined) {
    otpProps.value = value
    otpProps.onChange = onChange
  } else if (defaultValue !== undefined) {
    otpProps.defaultValue = defaultValue
  }

  return (
    <div>
      <label htmlFor="otp-input">Verification Code</label>
      <InputOTP {...otpProps}>
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
    </div>
  )
}

describe("InputOTP primitive", () => {
  it("renders 6 slots, associates with label, and passes axe", async () => {
    const { container } = render(<InputOTPFixture />)

    const slots = container.querySelectorAll("[data-slot=input-otp-slot]")
    expect(slots.length).toBe(6)

    const separator = container.querySelector("[data-slot=input-otp-separator]")
    expect(separator).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("handles entry and calls onComplete when filled", async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    const { container } = render(<InputOTPFixture onComplete={onComplete} />)

    const input = screen.getByRole("textbox", { name: "Verification Code" })
    await user.click(input)
    await user.type(input, "123456")

    const slots = container.querySelectorAll("[data-slot=input-otp-slot]")
    expect(slots[0].textContent).toBe("1")
    expect(slots[1].textContent).toBe("2")
    expect(slots[2].textContent).toBe("3")
    expect(slots[3].textContent).toBe("4")
    expect(slots[4].textContent).toBe("5")
    expect(slots[5].textContent).toBe("6")

    expect(onComplete).toHaveBeenCalledWith("123456")
  })

  it("supports deleting characters", async () => {
    const { container } = render(<InputOTPFixture defaultValue="12" />)

    const slots = container.querySelectorAll("[data-slot=input-otp-slot]")
    expect(slots[0].textContent).toBe("1")
    expect(slots[1].textContent).toBe("2")

    const input = screen.getByRole("textbox", { name: "Verification Code" })
    fireEvent.change(input, { target: { value: "1" } })

    expect(slots[0].textContent).toBe("1")
    expect(slots[1].textContent).toBe("")
  })

  it("respects disabled state", () => {
    render(<InputOTPFixture disabled />)

    const input = screen.getByRole("textbox", { name: "Verification Code" })
    expect(input).toBeDisabled()
  })
})
