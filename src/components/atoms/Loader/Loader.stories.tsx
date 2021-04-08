import { Story } from '@storybook/react';
import Loader from './Loader';

export default {
  title: 'ATOMS/Loader',
  component: Loader,
};

const Template: Story = () => <Loader />;

export const Main = Template.bind({});
