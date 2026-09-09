import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../src/components/ui/questionnaire.js"

const questionnaireItems = [
  {
    name: "experience",
    title: "What is your design system experience level?",
    description: "Helps us tailor recommendations to your team.",
    required: true,
    choices: [
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
    name: "stack",
    title: "Which frameworks do you use?",
    description: "Select all that apply to your projects.",
    multiple: true,
    required: false,
    choices: [
      { value: "next", label: "Next.js" },
      { value: "remix", label: "Remix / React Router" },
      { value: "vite", label: "Vite + React" },
      { value: "astro", label: "Astro" },
    ],
  },
  {
    name: "team",
    title: "What is your team or organization name?",
    description: "Optional identifier for your workspace.",
    required: false,
    input: {
      placeholder: "e.g. Acme Design",
    },
  },
] as const

const meta = {
  title: "Form/Questionnaire",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Official multi-step questionnaire primitive providing step progression, choices, keyboard shortcuts, and form validation.",
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
      const formData = new FormData(event.currentTarget)
      console.log(
        "Questionnaire completed:",
        Object.fromEntries(formData.entries())
      )
    }

    return (
      <div className="w-[500px]">
        <Questionnaire
          defaultItem="experience"
          items={questionnaireItems}
          shortcuts="letters"
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress />

          <QuestionnaireItem name="experience" required>
            <QuestionnaireTitle>
              What is your design system experience level?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Helps us tailor recommendations to your team.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="beginner">
                <span>Beginner</span>
                <QuestionnaireChoiceDescription>
                  Just starting with component libraries
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="intermediate">
                <span>Intermediate</span>
                <QuestionnaireChoiceDescription>
                  Built or maintained a small component library
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="advanced">
                <span>Advanced</span>
                <QuestionnaireChoiceDescription>
                  Architected enterprise-grade multi-brand systems
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem name="stack" multiple>
            <QuestionnaireTitle>
              Which frameworks do you use?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Select all that apply to your projects.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="next">
                <span>Next.js</span>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="remix">
                <span>Remix / React Router</span>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="vite">
                <span>Vite + React</span>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="astro">
                <span>Astro</span>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>

          <QuestionnaireItem name="team">
            <QuestionnaireTitle>
              What is your team or organization name?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Optional identifier for your workspace.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireInput
                placeholder="e.g. Acme Design"
                aria-label="Team name"
              />
            </QuestionnaireChoices>
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      </div>
    )
  },
}
