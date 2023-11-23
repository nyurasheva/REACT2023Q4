import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchResult from '../components/SearchResult';
import { api } from '../redux/apiSlice';
import pokemonReducer from '../redux/pokemonReducer';

const mockStore = configureStore({
  reducer: {
    pokemonState: pokemonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

describe('SearchResult Component', () => {
  it('displays the formation', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SearchResult onClosePokemonDetails={() => {}} />
        </MemoryRouter>
      </Provider>
    );
  });
});
