import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://651bfcdb194f77f2a5af3176.mockapi.io/',
  }),
  tagTypes: ['Contractors'],
  endpoints: (builder) => ({
    getContractorsList: builder.query({
      query: (activeStatus) => `contractors?filter=${activeStatus}`,
      //query: () => `contractors`,
      providesTags: ['Contractors'],
      transformResponse: (rawResponse) => {
        const transformedData = rawResponse.map((contractor) => ({
          ...contractor,
          key: contractor.id,
        }));
        return transformedData;
      },
    }),
    addContractor: builder.mutation({
      query: (body) => ({
        url: 'contractors',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contractors'],
    }),
    updateContractor: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        const newData = { ...body, date: dayjs(body.date).format() };

        return {
          url: `contractors/${id}`,
          method: 'PUT',
          body: newData,
        };
      },
      invalidatesTags: ['Contractors'],
    }),
  }),
});

export const {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} = catalogApi;
