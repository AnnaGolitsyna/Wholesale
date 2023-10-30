import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import contractorsSlice from './features/catalog/contractorsSlice';
import { contractorsApi } from './features/catalog/catalogApi';

export const store = configureStore({
  reducer: {
    // contractors: contractorsSlice,
    [contractorsApi.reducerPath]: contractorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contractorsApi.middleware),
});
