/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'ATOMS/Modal',
  component: Modal,
};

const Template: Story<ModalProps> = (args) => (<Modal {...args} />);

export const Main = Template.bind({});

Main.args = {
  isVisible: true,
};
