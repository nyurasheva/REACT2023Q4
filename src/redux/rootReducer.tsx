// rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer, { PokemonState } from './pokemonReducer';
import { api } from './apiSlice';

export interface RootState {
  pokemon: PokemonState;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}

const rootReducer = combineReducers<RootState>({
  pokemon: pokemonReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
