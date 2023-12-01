// store.js

import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formReducer';

const store = configureStore({
  reducer: {
    formState: formSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
