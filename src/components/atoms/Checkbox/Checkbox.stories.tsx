import { Story } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'ATOMS/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => {
  return (<Checkbox {...args} />)
};

export const Main = Template.bind({});

Main.args = {
  
};