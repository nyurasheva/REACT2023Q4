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
    // Замените fetch-вызовы вашими действиями Redux, которые вызываются при получении данных
    // Например, store.dispatch(action) для получения данных покемонов

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

  // it('opens Pokemon details on click', async () => {
  //   // Аналогично, эмулируйте вызовы Redux-действий для получения данных и деталей покемона

  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <PokemonSearch />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     const searchResultsText = screen.getByText(/Результаты поиска/, {
  //       exact: false,
  //     });
  //     expect(searchResultsText).toBeInTheDocument();
  //   });

  //   const bulbasaur = await screen.findByText(/bulbasaur/i);
  //   expect(bulbasaur).toBeInTheDocument();

  //   bulbasaur.click();

  //   await waitFor(() => {
  //     const pokemonDetails = screen.getByText(
  //       /abilities: chlorophyll, overgrow/i
  //     );
  //     expect(pokemonDetails).toBeInTheDocument();
  //   });
  // });
});
