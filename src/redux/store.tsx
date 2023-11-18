// store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { api } from './apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof store>;
// export type AppDispatch = AppStore<'dispatch'>;

export default store;
