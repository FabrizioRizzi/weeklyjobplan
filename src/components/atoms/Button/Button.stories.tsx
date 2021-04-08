import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => {
  return (<Button {...args} />)
};

export const Main = Template.bind({});

Main.args = {
  primary: true,
  title: "Prova"
};