import { createSlice } from '@reduxjs/toolkit';
//import { contractorsList } from '../../gateway/contractor';

const initialState = {
  contractors: [],
};

export const contractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {
    createNewContractor: (state, action) => {
      state.contractors.push(action.payload);

    },
    updateContractor: (state, action) => {
      const { key, updatedData } = action.payload;
      const existingContractor = state.contractors.find(
        (contractor) => contractor.key === key
      );

      if (existingContractor) {
        Object.assign(existingContractor, updatedData);
      }
    },
  },
  
});

export const { createNewContractor, updateContractor } =
  contractorsSlice.actions;

export default contractorsSlice.reducer;
