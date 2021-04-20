import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders Button component', () => {
    // eslint-disable-next-line no-console
    render(<Button primary onClick={() => console.log('cliccato')} />);
    expect(screen.getByText('Bottone')).toBeInTheDocument();
  });
});
