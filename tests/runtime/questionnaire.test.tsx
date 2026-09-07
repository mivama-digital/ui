import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import axe from "axe-core"
import { describe, expect, it, vi } from "vitest"

import {
  Questionnaire,
  QuestionnaireDescription,
  QuestionnaireFooter,
  QuestionnaireHeader,
  QuestionnaireTitle,
  type QuestionnaireStepData,
} from "../../src/components/ui/questionnaire.js"

const testSteps: QuestionnaireStepData[] = [
  {
    id: "goal",
    title: "What is your primary goal?",
    description: "Select the option that best fits your workflow.",
    type: "radio",
    required: true,
    options: [
      { value: "speed", label: "Build faster" },
      { value: "quality", label: "Higher design quality" },
      { value: "scale", label: "Scale across teams" },
    ],
  },
  {
    id: "name",
    title: "What is your project name?",
    description: "Enter a name for your workspace.",
    type: "text",
    required: true,
    placeholder: "e.g. Acme App",
  },
]

describe("Questionnaire runtime & accessibility", () => {
  it("renders step list semantics, progress, and first question", async () => {
    const { container } = render(<Questionnaire steps={testSteps} />)

    // Step list semantics
    const nav = screen.getByRole("navigation", { name: "Questionnaire steps" })
    expect(nav).toBeInTheDocument()

    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()

    const listItems = screen.getAllByRole("listitem")
    expect(listItems).toHaveLength(2)
    expect(listItems[0]).toHaveAttribute("aria-current", "step")
    expect(listItems[1]).not.toHaveAttribute("aria-current")

    // Progress bar
    const progressBar = screen.getByRole("progressbar", {
      name: "Questionnaire progress",
    })
    expect(progressBar).toBeInTheDocument()
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument()

    // Title and question
    expect(
      screen.getByRole("heading", { name: "What is your primary goal?" })
    ).toBeInTheDocument()

    // Buttons are type="button" to prevent form submission
    const buttons = screen.getAllByRole("button")
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("type", "button")
    })

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("handles validation and error announcement on required steps", async () => {
    const onComplete = vi.fn()
    const { container } = render(
      <Questionnaire steps={testSteps} onComplete={onComplete} />
    )

    const nextBtn = screen.getByRole("button", { name: "Next" })
    // Click Next without selecting an option
    fireEvent.click(nextBtn)

    // Error announced with role="alert"
    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent("Please provide an answer to continue.")
    expect(onComplete).not.toHaveBeenCalled()

    // Radio inputs marked with aria-invalid
    const radios = screen.getAllByRole("radio")
    radios.forEach((r) => {
      expect(r).toHaveAttribute("aria-invalid", "true")
    })

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("progresses through steps and triggers onComplete on finish", async () => {
    const onComplete = vi.fn()
    const onStepChange = vi.fn()
    render(
      <Questionnaire
        steps={testSteps}
        onComplete={onComplete}
        onStepChange={onStepChange}
      />
    )

    // Select first option
    const speedRadio = screen.getByLabelText("Build faster")
    fireEvent.click(speedRadio)
    expect(speedRadio).toBeChecked()

    // Click Next
    const nextBtn = screen.getByRole("button", { name: "Next" })
    fireEvent.click(nextBtn)
    expect(onStepChange).toHaveBeenCalledWith(1)

    // Now on step 2
    expect(
      screen.getByRole("heading", { name: "What is your project name?" })
    ).toBeInTheDocument()
    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument()

    // Fill in text
    const textInput = screen.getByPlaceholderText("e.g. Acme App")
    fireEvent.change(textInput, { target: { value: "My Project" } })

    // Click Complete
    const completeBtn = screen.getByRole("button", { name: "Complete" })
    fireEvent.click(completeBtn)

    expect(onComplete).toHaveBeenCalledWith({
      goal: "speed",
      name: "My Project",
    })
  })

  it("supports Back button navigation", async () => {
    const onStepChange = vi.fn()
    render(
      <Questionnaire
        steps={testSteps}
        defaultStep={1}
        defaultAnswers={{ goal: "speed" }}
        onStepChange={onStepChange}
      />
    )

    const backBtn = screen.getByRole("button", { name: "Back" })
    expect(backBtn).not.toBeDisabled()

    fireEvent.click(backBtn)
    expect(onStepChange).toHaveBeenCalledWith(0)
    expect(
      screen.getByRole("heading", { name: "What is your primary goal?" })
    ).toBeInTheDocument()
  })

  it("renders checkbox question and handles toggling options", async () => {
    const checkboxStep = [
      {
        id: "features",
        title: "Select features",
        description: "Pick all that apply",
        type: "checkbox" as const,
        options: [
          {
            value: "auth",
            label: "Authentication",
            description: "Secure login flow",
          },
          { value: "db", label: "Database", description: "Persistent storage" },
        ],
      },
    ]

    const onComplete = vi.fn()
    const { container } = render(
      <Questionnaire steps={checkboxStep} onComplete={onComplete} />
    )

    const authCheckbox = container.querySelector<HTMLInputElement>(
      'input[value="auth"]'
    )!
    expect(authCheckbox).toBeInTheDocument()
    expect(authCheckbox.checked).toBe(false)

    fireEvent.click(authCheckbox)
    expect(authCheckbox.checked).toBe(true)

    // Uncheck
    fireEvent.click(authCheckbox)
    expect(authCheckbox.checked).toBe(false)

    fireEvent.click(authCheckbox)
    const completeBtn = screen.getByRole("button", { name: "Complete" })
    fireEvent.click(completeBtn)
    expect(onComplete).toHaveBeenCalledWith({ features: ["auth"] })
  })

  it("renders standalone questionnaire compound components", () => {
    render(
      <QuestionnaireHeader className="custom-header">
        <QuestionnaireTitle>Standalone Title</QuestionnaireTitle>
        <QuestionnaireDescription>
          Standalone Description
        </QuestionnaireDescription>
        <QuestionnaireFooter>Standalone Footer</QuestionnaireFooter>
      </QuestionnaireHeader>
    )

    expect(screen.getByText("Standalone Title")).toBeInTheDocument()
    expect(screen.getByText("Standalone Description")).toBeInTheDocument()
    expect(screen.getByText("Standalone Footer")).toBeInTheDocument()
  })
})
