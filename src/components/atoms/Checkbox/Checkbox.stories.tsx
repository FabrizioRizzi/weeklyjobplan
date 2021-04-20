/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'ATOMS/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => (<Checkbox {...args} />);

export const Main = Template.bind({});

Main.args = {
  checked: true,
};
