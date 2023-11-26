import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders current year in the footer', () => {
    const currentYear = new Date().getFullYear();
    const { getByText } = render(<Footer />);
    const yearElement = getByText(currentYear.toString());
    expect(yearElement).toBeInTheDocument();
  });
});
