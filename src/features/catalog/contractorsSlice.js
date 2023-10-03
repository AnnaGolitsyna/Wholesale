import { createSlice } from '@reduxjs/toolkit';
import { contractorsList } from '../../gateway/contractor';

const initialState = {
  contractors: contractorsList,
};

export const contractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {
    createNewContractor: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { createNewContractor } = contractorsSlice.actions;

export default contractorsSlice.reducer;
