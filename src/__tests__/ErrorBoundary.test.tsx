import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorThrowButton from '../components/ErrorThrowButton';

describe('ErrorBoundary component', () => {
  it('renders children without throwing errors when there are no errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    const testContentElement = getByText('Test Content');
    expect(testContentElement).toBeInTheDocument();
  });

  it('renders without errors', () => {
    render(<ErrorThrowButton />);
    const throwButton = screen.getByText('Выбросить ошибку');
    expect(throwButton).toBeInTheDocument();
  });

  it('displays the error message when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowButton />
      </ErrorBoundary>
    );

    const throwButton = screen.getByText('Выбросить ошибку');
    throwButton.click();
  });
});
