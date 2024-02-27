import { configureStore } from '@reduxjs/toolkit';
import { catalogApi } from './features/catalog/catalogApi';
import { contractorsApi } from './pages/Contractors/api/contractorsApi';
import modalContractorReducer from './pages/Contractors/api/contractorsSlice';
import modalGoodsReducer from './features/catalog/goodsSlice';

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [contractorsApi.reducerPath]: contractorsApi.reducer,
    modalContractor: modalContractorReducer,
    modalGoods: modalGoodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'modalContractor/openModalContractor',
          'modalGoods/openModalGoods',
        ],
        ignoredPaths: [
          'modalContractor.selectedContractor.date',
          `modalGoods.selectedGoods.dateStart`,
          `modalGoods.selectedGoods.dateEnd`,
        ],
      },
    }).concat(catalogApi.middleware, contractorsApi.middleware),
});
