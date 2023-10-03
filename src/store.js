import { configureStore } from '@reduxjs/toolkit';
import contractorsSlice from './features/catalog/contractorsSlice';

export const store = configureStore({
  reducer: {
    contractors: contractorsSlice,
  },
});
