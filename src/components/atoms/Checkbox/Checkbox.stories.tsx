/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { action } from '@storybook/addon-actions';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'ATOMS/Checkbox',
  component: Checkbox,
};

// const Template: Story<CheckboxProps> = (args) => (<Checkbox {...args} />);

const Template: Story<CheckboxProps> = (args) => {
  const [, updateArgs] = useArgs();
  const handle = (checked: boolean) => {
    action('onChange');
    updateArgs({ ...args, checked });
  };

  return (<Checkbox {...args} onChange={handle} />);
};

export const Main = Template.bind({});

Main.args = {
  checked: true,
};
