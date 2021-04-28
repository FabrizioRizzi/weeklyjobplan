import { render, screen } from '@testing-library/react';
import RootNavigation from './RootNavigation';

test('renders home page', () => {
  render(<RootNavigation />);
  const headerEl = screen.getByText(/eekly/i);
  expect(headerEl).toBeInTheDocument();
});
