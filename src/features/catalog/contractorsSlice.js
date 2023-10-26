import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { contractorsList } from '../../gateway/contractor';
const baseUrl = 'https://651bfcdb194f77f2a5af3176.mockapi.io/contractors';

export const fetchContractors = createAsyncThunk(
  'contractors/fetchContractors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  contractors: [],
  status: null,
  error: null,
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
  extraReducers: {
    [fetchContractors.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchContractors.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.contractors = action.payload;
    },
    [fetchContractors.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { createNewContractor, updateContractor } =
  contractorsSlice.actions;

export default contractorsSlice.reducer;
