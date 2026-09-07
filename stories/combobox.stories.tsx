import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../src/components/ui/combobox.js"

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
          "Combobox component built on Base UI combobox primitive with query filtering and selection.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-[300px]">
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select framework..." />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(fw: (typeof frameworks)[number]) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}
