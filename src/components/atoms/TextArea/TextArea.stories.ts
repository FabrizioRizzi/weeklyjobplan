import { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";
import { fn } from "@storybook/test";

const meta: Meta<typeof TextArea> = {
  title: "ATOMS/TextArea",
  component: TextArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const DefaultTextArea: Story = {
  args: {
    value: 'description',
  },
};