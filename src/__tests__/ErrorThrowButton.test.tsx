import { render } from '@testing-library/react';
import ErrorThrowButton from '../components/ErrorThrowButton';

describe('ErrorThrowButton component', () => {
  it('renders without crashing', () => {
    render(<ErrorThrowButton />);
  });
});
