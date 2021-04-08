import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders Button component', () => {
    render(<Button primary={true} title="Bottone" onClick={() => console.log('cliccato')} />);
    expect(screen.getByText('Bottone')).toBeInTheDocument();
  });
});