import { configureStore } from '@reduxjs/toolkit';
import modalContractorReducer from './features/catalog/contractorsSlice';
import { catalogApi } from './features/catalog/catalogApi';

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    modalContractor: modalContractorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {

       // ignoredActions: ['modalContractor/openModalContractor'],
        ignoredPaths: ['modalContractor.selectedContractor.date'],

      },
    }).concat(catalogApi.middleware),
});
