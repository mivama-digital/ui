"use client"

import * as React from "react"

import { cn } from "../../lib/utils.js"
import { Button } from "./button.js"
import { Choice, ChoiceGroup } from "./choice.js"
import { Input } from "./input.js"
import { Progress } from "./progress.js"

interface QuestionnaireOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface QuestionnaireStepData {
  id: string
  title: string
  description?: string
  type?: "radio" | "checkbox" | "text"
  options?: QuestionnaireOption[]
  required?: boolean
  placeholder?: string
}

interface QuestionnaireProps extends Omit<
  React.ComponentProps<"div">,
  "onComplete"
> {
  steps: QuestionnaireStepData[]
  currentStep?: number
  defaultStep?: number
  onStepChange?: (stepIndex: number) => void
  onComplete?: (answers: Record<string, any>) => void
  answers?: Record<string, any>
  defaultAnswers?: Record<string, any>
  onAnswersChange?: (answers: Record<string, any>) => void
  showProgress?: boolean
  backText?: string
  nextText?: string
  completeText?: string
}

const Questionnaire = React.forwardRef<HTMLDivElement, QuestionnaireProps>(
  function Questionnaire(
    {
      steps,
      currentStep: controlledStep,
      defaultStep = 0,
      onStepChange,
      onComplete,
      answers: controlledAnswers,
      defaultAnswers = {},
      onAnswersChange,
      showProgress = true,
      backText = "Back",
      nextText = "Next",
      completeText = "Complete",
      className,
      ...props
    },
    ref
  ) {
    const [internalStep, setInternalStep] = React.useState(defaultStep)
    const [internalAnswers, setInternalAnswers] =
      React.useState<Record<string, any>>(defaultAnswers)
    const [error, setError] = React.useState<string | null>(null)

    const isStepControlled = controlledStep !== undefined
    const stepIndex = isStepControlled ? controlledStep : internalStep

    const isAnswersControlled = controlledAnswers !== undefined
    const answers = isAnswersControlled ? controlledAnswers : internalAnswers

    const currentStep = steps[stepIndex] ?? steps[0]
    const totalSteps = steps.length
    const isLastStep = stepIndex === totalSteps - 1
    const progressPercent =
      totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0

    const handleAnswerChange = (fieldId: string, value: any) => {
      setError(null)
      const nextAnswers = { ...answers, [fieldId]: value }
      if (!isAnswersControlled) {
        setInternalAnswers(nextAnswers)
      }
      onAnswersChange?.(nextAnswers)
    }

    const handleCheckboxToggle = (fieldId: string, optionValue: string) => {
      setError(null)
      const currentList: string[] = Array.isArray(answers[fieldId])
        ? [...answers[fieldId]]
        : []
      const index = currentList.indexOf(optionValue)
      if (index > -1) {
        currentList.splice(index, 1)
      } else {
        currentList.push(optionValue)
      }
      handleAnswerChange(fieldId, currentList)
    }

    const handleNext = () => {
      if (currentStep.required) {
        const val = answers[currentStep.id]
        const isEmpty =
          val === undefined ||
          val === null ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        if (isEmpty) {
          setError("Please provide an answer to continue.")
          return
        }
      }

      setError(null)

      if (isLastStep) {
        onComplete?.(answers)
      } else {
        const nextIndex = stepIndex + 1
        if (!isStepControlled) {
          setInternalStep(nextIndex)
        }
        onStepChange?.(nextIndex)
      }
    }

    const handleBack = () => {
      if (stepIndex > 0) {
        setError(null)
        const prevIndex = stepIndex - 1
        if (!isStepControlled) {
          setInternalStep(prevIndex)
        }
        onStepChange?.(prevIndex)
      }
    }

    if (!currentStep) {
      return null
    }

    return (
      <div
        ref={ref}
        data-slot="questionnaire"
        className={cn(
          "w-full max-w-lg space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs",
          className
        )}
        {...props}
      >
        <nav aria-label="Questionnaire steps">
          <ol className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <li
                key={s.id}
                aria-current={idx === stepIndex ? "step" : undefined}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  idx <= stepIndex ? "bg-primary" : "bg-muted"
                )}
              >
                <span className="sr-only">
                  Step {idx + 1}: {s.title}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {showProgress && (
          <div data-slot="questionnaire-progress" className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>
                Step {stepIndex + 1} of {totalSteps}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress
              value={progressPercent}
              aria-label="Questionnaire progress"
            />
          </div>
        )}

        <div className="space-y-2">
          <h3
            data-slot="questionnaire-title"
            className="text-lg font-semibold tracking-tight"
          >
            {currentStep.title}
          </h3>
          {currentStep.description && (
            <p
              data-slot="questionnaire-description"
              className="text-sm text-muted-foreground"
            >
              {currentStep.description}
            </p>
          )}
        </div>

        <div data-slot="questionnaire-content" className="py-2">
          {currentStep.type === "radio" && currentStep.options && (
            <ChoiceGroup className="gap-3">
              {currentStep.options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <Choice
                    type="radio"
                    name={currentStep.id}
                    value={opt.value}
                    checked={answers[currentStep.id] === opt.value}
                    onChange={(e) =>
                      handleAnswerChange(currentStep.id, e.target.value)
                    }
                    disabled={opt.disabled}
                    aria-invalid={error ? "true" : undefined}
                  />
                  <div className="grid gap-0.5 text-sm">
                    <span className="font-medium text-foreground">
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="text-muted-foreground text-xs">
                        {opt.description}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </ChoiceGroup>
          )}

          {currentStep.type === "checkbox" && currentStep.options && (
            <ChoiceGroup className="gap-3">
              {currentStep.options.map((opt) => {
                const isChecked =
                  Array.isArray(answers[currentStep.id]) &&
                  answers[currentStep.id].includes(opt.value)

                return (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                  >
                    <Choice
                      type="checkbox"
                      name={currentStep.id}
                      value={opt.value}
                      checked={isChecked}
                      onChange={() =>
                        handleCheckboxToggle(currentStep.id, opt.value)
                      }
                      disabled={opt.disabled}
                      aria-invalid={error ? "true" : undefined}
                    />
                    <div className="grid gap-0.5 text-sm">
                      <span className="font-medium text-foreground">
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="text-muted-foreground text-xs">
                          {opt.description}
                        </span>
                      )}
                    </div>
                  </label>
                )
              })}
            </ChoiceGroup>
          )}

          {currentStep.type === "text" && (
            <Input
              id={currentStep.id}
              value={answers[currentStep.id] ?? ""}
              placeholder={currentStep.placeholder}
              onChange={(e) =>
                handleAnswerChange(currentStep.id, e.target.value)
              }
              aria-invalid={error ? "true" : undefined}
            />
          )}
        </div>

        {error && (
          <p
            role="alert"
            data-slot="questionnaire-error"
            className="text-xs font-medium text-destructive"
          >
            {error}
          </p>
        )}

        <div
          data-slot="questionnaire-footer"
          className="flex items-center justify-between pt-2"
        >
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={stepIndex === 0}
          >
            {backText}
          </Button>
          <Button type="button" onClick={handleNext}>
            {isLastStep ? completeText : nextText}
          </Button>
        </div>
      </div>
    )
  }
)
Questionnaire.displayName = "Questionnaire"

function QuestionnaireHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-header"
      className={cn("space-y-1.5", className)}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="questionnaire-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="questionnaire-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-footer"
      className={cn("flex items-center justify-between pt-2", className)}
      {...props}
    />
  )
}

export {
  Questionnaire,
  QuestionnaireDescription,
  QuestionnaireFooter,
  QuestionnaireHeader,
  QuestionnaireTitle,
}
export type { QuestionnaireOption, QuestionnaireProps, QuestionnaireStepData }
