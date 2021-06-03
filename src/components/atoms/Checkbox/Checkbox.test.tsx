import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

const mockCallBack = jest.fn();

describe('Checkbox', () => {
  test('renders Button component', () => {
    render(<Checkbox onChange={mockCallBack} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('execute callback on change', () => {
    render(<Checkbox onChange={mockCallBack} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
