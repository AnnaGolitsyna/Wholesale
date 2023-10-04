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
      state.contractors.push(action.payload);
      console.log('slice', state, action);
    },
    updateContractor: (state, action) => {
      const { key, updatedData } = action.payload;
      const existingContractor = state.contractors.find(
        (contractor) => contractor.key === key
      );

      if (existingContractor) {
        Object.assign(existingContractor, updatedData);
      }
      // else {
      //   setContractors((prevState) => {
      //     return prevState.map((contractor, index) => {
      //       if (index === existingIndex) {
      //         return newValue;
      //       }
      //       return contractor;
      //     });
      //   });
      // }
    },
  },
});

export const { createNewContractor, updateContractor } =
  contractorsSlice.actions;

export default contractorsSlice.reducer;
