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
        // ignoredActionPaths: [
        //   `meta.arg.originalArgs.date`,
        //   `meta.baseQueryMeta.request`,
        //   `meta.baseQueryMeta.response`,
        // ],
        // ignoredActionPaths: ['payload.date'],
        ignoredActions: ['modalContractor/openModalContractor'],
        ignoredPaths: ['modalContractor.selectedContractor.date'],
        // ignoredPaths: ['payload.date'],
      },
    }).concat(catalogApi.middleware),
});
