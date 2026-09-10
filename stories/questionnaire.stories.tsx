import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Questionnaire } from "../src/components/ui/questionnaire.js"
import { Button } from "../src/components/ui/button.js"
import { Input } from "../src/components/ui/input.js"
import { Label } from "../src/components/ui/label.js"

const meta = {
  title: "Form/Questionnaire",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Form container for multi-step questions and surveys.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
    }

    return (
      <div className="w-[400px]">
        <Questionnaire onSubmit={handleSubmit}>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Design Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Please share your experience using the system.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">What is your experience level?</Label>
            <Input id="experience" placeholder="e.g. Beginner, Intermediate" />
          </div>
          <Button type="submit">Submit Feedback</Button>
        </Questionnaire>
      </div>
    )
  },
}
