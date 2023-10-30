import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://651bfcdb194f77f2a5af3176.mockapi.io/',
  }),
  tagTypes: ['Contractors'],
  endpoints: (builder) => ({
    getContractorsList: builder.query({
      query: () => 'contractors',
      providesTags: ['Contractors'],
    }),
    addContractor: builder.mutation({
      query: (body) => ({
        url: 'contractors',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contractors'],
    }),
  }),
});

export const { useGetContractorsListQuery, useAddContractorMutation } = catalogApi;
