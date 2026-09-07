import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Questionnaire,
  type QuestionnaireStepData,
} from "../src/components/ui/questionnaire.js"

const sampleSteps: QuestionnaireStepData[] = [
  {
    id: "experience",
    title: "What is your design system experience level?",
    description: "Helps us tailor recommendations to your team.",
    type: "radio",
    required: true,
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "Just starting with component libraries",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "Built or maintained a small component library",
      },
      {
        value: "advanced",
        label: "Advanced",
        description: "Architected enterprise-grade multi-brand systems",
      },
    ],
  },
  {
    id: "stack",
    title: "Which frameworks do you use?",
    description: "Select all that apply to your projects.",
    type: "checkbox",
    options: [
      { value: "next", label: "Next.js" },
      { value: "remix", label: "Remix / React Router" },
      { value: "vite", label: "Vite + React" },
      { value: "astro", label: "Astro" },
    ],
  },
  {
    id: "team",
    title: "What is your team or organization name?",
    description: "Optional identifier for your workspace.",
    type: "text",
    placeholder: "e.g. Acme Design",
  },
]

const meta = {
  title: "Form/Questionnaire",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-step questionnaire composition using Field, Choice, Progress, and Button.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-[500px]">
      <Questionnaire
        steps={sampleSteps}
        onComplete={(answers) => {
          console.log("Questionnaire completed:", answers)
        }}
      />
    </div>
  ),
}
