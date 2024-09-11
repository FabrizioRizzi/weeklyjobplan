import { Meta, StoryObj } from "@storybook/react";
import Loading from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "ATOMS/Loading",
  component: Loading,
  parameters: { layout: "centered" },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const LoadingEnabled: Story = {};
