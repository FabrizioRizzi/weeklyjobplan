

import { Meta, StoryObj } from "@storybook/react";
import TaskLength from "./TaskLength";

const meta: Meta<typeof TaskLength> = {
  title: "ATOMS/TaskLength",
  component: TaskLength,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TaskLength>;

export const DefaultTaskLength: Story = {
  args: {
    length: 130,
  },
};
