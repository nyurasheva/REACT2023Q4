import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PokemonCard } from '../components/PokemonCard';
import { api } from '../redux/apiSlice';
import pokemonReducer from '../redux/pokemonReducer';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore({
  reducer: {
    pokemonState: pokemonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

describe('PokemonCard Component', () => {
  it('displays the pokemon name when data is available', () => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/1';
    const { getByText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PokemonCard url={pokemonUrl} />
        </MemoryRouter>
      </Provider>
    );

    const pokemonNameElement = getByText(/Loading.../i, { exact: false });
    expect(pokemonNameElement).toBeInTheDocument();
  });
});
