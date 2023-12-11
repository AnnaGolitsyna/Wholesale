import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';
import { CATALOG_API_URL } from '../../constants/url';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CATALOG_API_URL,
  }),
  tagTypes: ['Contractors', 'Goods'],
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
        const newData = { ...body, date: body.date ? dayjs(body.date).format() : null };

        return {
          url: `contractors/${id}`,
          method: 'PUT',
          body: newData,
        };
      },
      invalidatesTags: ['Contractors'],
    }),

    getGoodsList: builder.query({
      query: (activeStatus) => `goods?filter=${activeStatus}`,
      providesTags: ['Goods'],
      transformResponse: (rawResponse) => {
        const transformedData = rawResponse.map((goods) => ({
          ...goods,
          key: goods.id,
        }));
        return transformedData;
      },
    }),
    addGoods: builder.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Goods'],
    }),
    updateProduct: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        const newData = {
          ...body,
          dateStart: dayjs(body.dateStart).format(),
          dateEnd: body.dateEnd ? dayjs(body.dateEnd).format() : null,
        };

        return {
          url: `goods/${id}`,
          method: 'PUT',
          body: newData,
        };
      },
      invalidatesTags: ['Goods'],
    }),
  }),
});

export const {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
  useGetGoodsListQuery,
  useAddGoodsMutation,
  useUpdateProductMutation,
} = catalogApi;
