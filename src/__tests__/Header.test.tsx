import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from '../components/Logo';

describe('Logo component', () => {
  it('renders with alt text "logo"', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoElement = getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });
});
