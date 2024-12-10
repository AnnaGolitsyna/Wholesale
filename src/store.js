import { configureStore } from '@reduxjs/toolkit';
import { contractorsApi } from './pages/Contractors';
import { goodsApi } from './pages/Goods';

export const store = configureStore({
  reducer: {
    [contractorsApi.reducerPath]: contractorsApi.reducer,
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      contractorsApi.middleware,
      goodsApi.middleware
    ),
});
