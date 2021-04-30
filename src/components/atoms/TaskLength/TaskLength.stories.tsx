/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import TaskLength, { TaskLengthProps } from './TaskLength';

export default {
  title: 'ATOMS/TaskLength',
  component: TaskLength,
};

const Template: Story<TaskLengthProps> = (args) => <TaskLength {...args} />;

export const Main = Template.bind({});

Main.args = {
  length: 135,
};
