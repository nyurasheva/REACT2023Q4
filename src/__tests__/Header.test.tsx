import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Logo } from '../components/Logo';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Logo component', () => {
  it('renders with alt text "logo"', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: '/',
    });

    const { getByAltText } = render(<Logo />);

    const logoElement = getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });
});
