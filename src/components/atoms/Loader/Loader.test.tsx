import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  test('renders Loader component', () => {
    const { container } = render(<Loader />)
    expect(container.firstChild).toHaveClass('Loader')
  });
});