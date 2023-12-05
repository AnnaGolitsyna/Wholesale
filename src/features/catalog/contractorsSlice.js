import { createSlice } from '@reduxjs/toolkit';
import { formattedDateObj } from '../../utils/dateUtils';

const contractorInitial = {
  active: true,
  name: '',
  fullName: '',
  category: '',
  categoryPrice: '',
  taxNumber: '',
  contractNumber: '',
  date: null,
  email: '',
  phone: '',
  adress: '',
};

const initialState = {
  isContractorModalOpen: false,
  selectedContractor: contractorInitial,
};

const modalContractorSlice = createSlice({
  name: 'modalContractor',
  initialState,
  reducers: {
    openModalContractor: (state, action) => {
      console.log('reducer', action);
      const formattedContractor = {
        ...action.payload,
        date: action.payload?.date
          ? formattedDateObj(action.payload.date)
          : null,
      };
      state.isContractorModalOpen = true;
      state.selectedContractor = formattedContractor || contractorInitial;
    },
    closeModalContractor: (state) => {
      state.isContractorModalOpen = false;
      state.selectedContractor = contractorInitial;
    },
  },
});

export const { openModalContractor, closeModalContractor } =
  modalContractorSlice.actions;
export default modalContractorSlice.reducer;
