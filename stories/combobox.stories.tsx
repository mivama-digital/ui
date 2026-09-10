import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Combobox } from "../src/components/ui/combobox.js"

const frameworks = [
  { label: "Next.js", value: "next.js" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

const meta = {
  title: "Form/Combobox",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Combobox component built on Popover and Command primitives with query filtering and selection.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function ComboboxDemo() {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-[300px]">
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
      />
    </div>
  )
}

export const Basic: Story = {
  render: () => <ComboboxDemo />,
}
