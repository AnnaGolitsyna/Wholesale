import { createSlice } from '@reduxjs/toolkit';
import {formattedDateObj} from '../../utils/dateUtils'

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
    closeModal: (state) => {
      state.isContractorModalOpen = false;
      state.selectedContractor = contractorInitial;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
