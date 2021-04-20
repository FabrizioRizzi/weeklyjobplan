/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'ATOMS/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => (<Button {...args} />);

export const Main = Template.bind({});

Main.args = {
  primary: true,
};
