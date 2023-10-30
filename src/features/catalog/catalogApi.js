import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contractorsApi = createApi({
  reducerPath: 'contractorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://651bfcdb194f77f2a5af3176.mockapi.io/',
  }),
  endpoints: (builder) => ({
    getContractorsList: builder.query({
      query: () => 'contractors',
    }),
  }),
});

export const { useGetContractorsListQuery } = contractorsApi;
