// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { api } from './apiSlice';
import pokemonSlice from './pokemonReducer';

const store = configureStore({
  reducer: {
    pokemonState: pokemonSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
