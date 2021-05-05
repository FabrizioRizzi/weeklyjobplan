import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

const mockCallBack = jest.fn();

describe('Button', () => {
  test('renders Button component', () => {
    render(<Button primary onClick={mockCallBack}>Bottone</Button>);
    expect(screen.getByText('Bottone')).toBeInTheDocument();
  });
  test('Execute callback on click', () => {
    render(<Button primary onClick={mockCallBack}>Bottone</Button>);
    fireEvent.click(screen.getByText('Bottone'));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
