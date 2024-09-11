import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import { describe, test, expect, vi } from 'vitest';

const mockCallBack = vi.fn();

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
