import { configureStore } from '@reduxjs/toolkit';
import { catalogApi } from './features/catalog/catalogApi';
import modalContractorReducer from './features/catalog/contractorsSlice';
import modalGoodsReducer from './features/catalog/goodsSlice';

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    modalContractor: modalContractorReducer,
    modalGoods: modalGoodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modalContractor/openModalContractor'],
        ignoredPaths: [
          'modalContractor.selectedContractor.date',
          `modalGoods.selectedGoods.dateStart`,
          `modalGoods.selectedGoods.dateEnd`,
        ],
      },
    }).concat(catalogApi.middleware),
});
