import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const productInitial = {
  active: true,
  name: '',
  fullName: '',
  supplier: '',
  cost: 0,
  superBulk: 0,
  bulk: 0,
  retail: 0,
  dateStart: dayjs(),
  dateEnd: null,
};

const initialState = {
  isGoodsModalOpen: false,
  selectedGoods: productInitial,
};

const modalGoodsSLice = createSlice({
  name: 'modalGoods',
  initialState,
  reducers: {
    openModalGoods: (state, action) => {
      state.isGoodsModalOpen = true;
      state.selectedGoods = action.payload || productInitial;
    },
    closeModalGoods: (state) => {
      state.isGoodsModalOpen = false;
      state.selectedGoods = productInitial;
    },
  },
});

export const { openModalGoods, closeModalGoods } = modalGoodsSLice.actions;
//export default modalGoodsSLice.reducer;
export const modalGoodsReducer = modalGoodsSLice.reducer;

