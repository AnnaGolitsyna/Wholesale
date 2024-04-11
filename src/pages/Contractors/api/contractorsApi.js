import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATALOG_API_URL } from '../../../constants/url';
import { getShortDateFormat } from '../../../utils/dateUtils';

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
      query: (body) => {
        const newData = {
          ...body,
          date: getShortDateFormat(body.date),
          relatedCompanies: body.relatedCompanies ?? [],
        };
        return {
          url: 'contractors',
          method: 'POST',
          body: newData,
        };
      },
      invalidatesTags: ['Contractors'],
    }),
    updateContractor: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        const newData = {
          ...body,
          date: getShortDateFormat(body.date),
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
