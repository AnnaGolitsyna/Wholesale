import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';
import { CATALOG_API_URL } from '../../../constants/url';

export const contractorsApi = createApi({
  reducerPath: 'contractorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CATALOG_API_URL,
  }),
  tagTypes: ['Contractors'],
  endpoints: (builder) => ({
    getContractorsList: builder.query({
      query: (activeStatus) => `contractors?filter=${activeStatus}`,
      providesTags: ['Contractors'],
      transformResponse: (rawResponse) => {
        const transformedData = rawResponse.map(
          ({ relatedCompanies, id, ...contractor }) => ({
            ...contractor,
            id,
            key: id,
            relatedCompanies: relatedCompanies.map(({ id, ...el }) => ({
              ...el,
              id,
              key: id,
            })),
          })
        );
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

        const newData = {
          ...body,
          date: body.date ? dayjs(body.date).format() : null,
        };

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
} = contractorsApi;
