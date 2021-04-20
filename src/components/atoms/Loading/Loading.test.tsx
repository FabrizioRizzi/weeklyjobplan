import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renders Loading component', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toHaveClass('Loading');
  });
});
