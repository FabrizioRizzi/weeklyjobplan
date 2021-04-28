/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'ATOMS/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => (<Button {...args}>Bottone</Button>);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Loading = Template.bind({});

Primary.args = {
  primary: true,
};

Secondary.args = {
  primary: false,
};

Loading.args = {
  primary: true,
  loading: true,
};
