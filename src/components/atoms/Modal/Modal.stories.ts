import { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import { fn } from "@storybook/test";

const meta: Meta<typeof Modal> = {
  title: "ATOMS/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    width: 300,
    height: 200,
    title: "Title",
    children: "content",
    closeModal: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ModalVisible: Story = {
  args: {
    isVisible: true,
  },
};
