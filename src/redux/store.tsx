// store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   pokemon: pokemonReducer,
  // },
});

export default store;
