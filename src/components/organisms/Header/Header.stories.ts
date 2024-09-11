import { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { fn } from "@storybook/test";

const meta: Meta<typeof Header> = {
  title: "ORGANISMS/Header",
  component: Header,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    changeYear: fn(),
    changeWeek: fn(),
    previousWeek: fn(),
    nextWeek: fn(),
    reset: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const DeafultHeader: Story = {
  args: {
    year: 2024,
    week: 2,
  },
};
