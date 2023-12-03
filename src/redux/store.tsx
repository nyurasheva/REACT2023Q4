// store.js

import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formReducer';
import countriesSlice from './countriesReducer';

const store = configureStore({
  reducer: {
    formState: formSlice,
    countriesState: countriesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
