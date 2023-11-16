import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

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
});
