import { createSlice } from '@reduxjs/toolkit';

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

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isContractorModalOpen = true;
      state.selectedContractor = action.payload || contractorInitial;
    },
    closeModal: (state) => {
      state.isContractorModalOpen = false;
      state.selectedContractor = contractorInitial;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
