import { render, screen } from '@testing-library/react';
import RootNavigation from './RootNavigation';

test('renders home page', () => {
  render(<RootNavigation />);
  const headerEl = screen.getByText(/ettimana/i);
  expect(headerEl).toBeInTheDocument();
});