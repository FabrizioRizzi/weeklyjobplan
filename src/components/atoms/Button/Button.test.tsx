import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders Button component', () => {
    // eslint-disable-next-line no-console
    render(<Button primary onClick={() => console.log('cliccato')}>Bottone</Button>);
    expect(screen.getByText('Bottone')).toBeInTheDocument();
  });
});
