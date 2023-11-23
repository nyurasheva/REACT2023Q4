import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PokemonSearch from '../components/PokemonSearch';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('PokemonSearch component', () => {
  it('renders without errors and displays search results', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PokemonSearch />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const searchResultsText = screen.getByText(/Результаты поиска/, {
        exact: false,
      });
      expect(searchResultsText).toBeInTheDocument();
    });
  });
});
