import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/catalog/contractorsSlice';
import { catalogApi } from './features/catalog/catalogApi';

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['modal.selectedContractor.date'],
      },
    }).concat(catalogApi.middleware),
});
