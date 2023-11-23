import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../components/AppRouter';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('AppRouter Component', () => {
  it('renders routes correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
  });
});
