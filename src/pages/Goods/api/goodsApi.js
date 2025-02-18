import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATALOG_API_URL } from '../../../constants/url';
import { getShortDateFormat } from '../../../utils/dateUtils';

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
      query: (body) => {
        const newData = {
          ...body,
          dateStart: getShortDateFormat(body.dateStart),
          dateEnd: getShortDateFormat(body.dateEnd),
          cost: body.cost ?? 0,
          superBulk: body.superBulk ?? 0,
          bulk: body.bulk ?? 0,
          retail: body.retail ?? 0,
        };

        return {
          url: 'goods',
          method: 'POST',
          body: newData,
        };
      },

      invalidatesTags: ['Goods'],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        const newData = {
          ...body,

          dateStart: getShortDateFormat(body.dateStart),
          dateEnd: getShortDateFormat(body.dateEnd),
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
