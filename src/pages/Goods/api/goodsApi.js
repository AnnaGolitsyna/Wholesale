import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';
import { CATALOG_API_URL } from '../../../constants/url';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CATALOG_API_URL,
  }),
  tagTypes: ['Goods'],
  endpoints: (builder) => ({
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
  useGetGoodsListQuery,
  useAddGoodsMutation,
  useUpdateProductMutation,
} = goodsApi;
