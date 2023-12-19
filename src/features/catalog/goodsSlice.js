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
  actionType: '',
};

const modalGoodsSLice = createSlice({
  name: 'modalGoods',
  initialState,
  reducers: {
    setActionType: (state, action) => {
      state.actionType = action.payload;
    },
    openModalGoods: (state, action) => {
      state.isGoodsModalOpen = true;
      state.selectedGoods = action.payload || productInitial;
    },
    closeModalGoods: (state) => {
      state.isGoodsModalOpen = false;
      state.selectedGoods = productInitial;
      state.setActionType = '';
    },
  },
});

export const { openModalGoods, closeModalGoods, setActionType } =
  modalGoodsSLice.actions;
export default modalGoodsSLice.reducer;
