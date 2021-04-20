/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Header, { HeaderProps } from './Header';

export default {
  title: 'ORGANISMS/Header',
  component: Header,
};

const Template: Story<HeaderProps> = (args) => (<Header {...args} />);

export const Main = Template.bind({});

Main.args = {
  week: 2,
};
