import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../components/AppRouter';

describe('AppRouter component', () => {
  it('renders routes', async () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
  });
});
