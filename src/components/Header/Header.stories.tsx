import { Story } from '@storybook/react';
import Header, { HeaderProps } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template: Story<HeaderProps> = (args) => {
  return (<Header {...args} />)
};

export const Main = Template.bind({});

Main.args = {
  week: 2,
};