import { configureStore } from '@reduxjs/toolkit';
// import contractorsSlice from './features/catalog/contractorsSlice';
import { catalogApi } from './features/catalog/catalogApi';

export const store = configureStore({
  reducer: {
    // contractors: contractorsSlice,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware),
});
