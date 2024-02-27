// import { createSlice } from '@reduxjs/toolkit';

// const contractorInitial = {
//   active: true,
//   name: '',
//   fullName: '',
//   category: '',
//   categoryPrice: '',
//   taxNumber: '',
//   contractNumber: '',
//   date: null,
//   email: '',
//   phone: '',
//   adress: '',
// };

// const initialState = {
//   isContractorModalOpen: false,
//   selectedContractor: contractorInitial,
// };

// const modalContractorSlice = createSlice({
//   name: 'modalContractor',
//   initialState,
//   reducers: {
//     openModalContractor: (state, action) => {
//       state.isContractorModalOpen = true;
//       state.selectedContractor = action.payload || contractorInitial;
//     },
//     closeModalContractor: (state) => {
//       state.isContractorModalOpen = false;
//       state.selectedContractor = contractorInitial;
//     },
//   },
// });

// export const { openModalContractor, closeModalContractor } =
//   modalContractorSlice.actions;
// export default modalContractorSlice.reducer;
