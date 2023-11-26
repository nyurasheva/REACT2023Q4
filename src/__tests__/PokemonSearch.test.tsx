import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PokemonSearch from '../components/PokemonSearch';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('PokemonSearch component', () => {
  it('renders without errors and displays search results', async () => {
    render(
      <Provider store={store}>
        <PokemonSearch />
      </Provider>
    );

    await waitFor(() => {
      const searchResultsText = screen.getByText(/Результаты поиска/, {
        exact: false,
      });
      expect(searchResultsText).toBeInTheDocument();
    });
  });
});
