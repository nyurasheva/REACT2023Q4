import { render, screen } from '@testing-library/react';
import { Main } from '../pages/Main';
import { MemoryRouter } from 'react-router-dom';

describe('Main component', () => {
  it('renders Main component', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('2023')).toBeTruthy();
  });
});
