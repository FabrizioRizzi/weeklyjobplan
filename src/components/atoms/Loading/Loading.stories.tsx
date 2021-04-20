// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/react';
import Loading from './Loading';

export default {
  title: 'ATOMS/Loading',
  component: Loading,
};

const Template: Story = () => <Loading />;

export const Main = Template.bind({});
