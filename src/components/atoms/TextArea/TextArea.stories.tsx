/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'ATOMS/TextArea',
  component: TextArea,
};

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Main = Template.bind({});

Main.args = {
  value: 'description',
};
