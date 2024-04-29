import { configureStore } from '@reduxjs/toolkit';
//import { catalogApi } from './features/catalog/catalogApi';
import { contractorsApi } from './pages/Contractors';
import { goodsApi } from './pages/Goods';
//import { modalContractorReducer } from './pages/Contractors';
//import { modalGoodsReducer } from './pages/Goods';

export const store = configureStore({
  reducer: {
    // [catalogApi.reducerPath]: catalogApi.reducer,
    [contractorsApi.reducerPath]: contractorsApi.reducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
    // modalContractor: modalContractorReducer,
    // modalGoods: modalGoodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contractorsApi.middleware, goodsApi.middleware),
});
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           'modalContractor/openModalContractor',
//           'modalGoods/openModalGoods',
//         ],
//         ignoredPaths: [
//           'modalContractor.selectedContractor.date',
//           `modalGoods.selectedGoods.dateStart`,
//           `modalGoods.selectedGoods.dateEnd`,
//         ],
//       },
//     }).concat(
//      // catalogApi.middleware,
//       contractorsApi.middleware,
//       goodsApi.middleware
//     ),
// });
