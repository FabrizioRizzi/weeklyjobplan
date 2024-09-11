import { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";
import { fn } from "@storybook/test";

const meta: Meta<typeof Checkbox> = {
  title: "ATOMS/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};


export const Unchecked: Story = {
  args: {
    checked: false,
  },
};