/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import TextInput, { TextInputProps } from './TextInput';

export default {
  title: 'ATOMS/TextInput',
  component: TextInput,
};

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Main = Template.bind({});

Main.args = {
  value: 'text',
};
