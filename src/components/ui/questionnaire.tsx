import * as React from "react"
import { cn } from "@/lib/utils"

export interface QuestionnaireProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export function Questionnaire({ className, ...props }: QuestionnaireProps) {
  return <form className={cn("flex flex-col gap-6", className)} {...props} />
}
