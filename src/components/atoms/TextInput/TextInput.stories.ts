import { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";
import { fn } from "@storybook/test";

const meta: Meta<typeof TextInput> = {
  title: "ATOMS/TextInput",
  component: TextInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const DefaultTextInput: Story = {
  args: {
    value: 'text',
  },
};
