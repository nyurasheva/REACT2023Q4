// rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer, { PokemonState } from './pokemonReducer';

export interface RootState {
  pokemon: PokemonState;
}

const rootReducer = combineReducers<RootState>({
  pokemon: pokemonReducer,
});

export default rootReducer;
