import {
  useGetGoodsListQuery as useMockGoodsList,
  useAddGoodsMutation as useAddMockGoodsMutation,
  useUpdateProductMutation as useUpdateMockProductMutation,
} from './api/goodsApi';

import {
  useFirebaseGoodsList,
  useAddGoodsFirebase,
  useUpdateProductFirebase,
} from './api/firebase/operations';

import { CURRENT_DATA_SOURCE, DATA_SOURCE } from './api/dataSourceConfig';

export { GoodsPage as default } from './components/goodsPage/GoodsPage.jsx';

export { getFieldsForGoodsFormList } from './utils/getFormList.js';
export { getPriceListColumns } from './utils/getPriceListColumns';
export { goodsApi } from './api/goodsApi';

export const useGetGoodsListQuery =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useFirebaseGoodsList
    : useMockGoodsList;

export const useAddGoodsMutation =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useAddGoodsFirebase
    : useAddMockGoodsMutation;

export const useUpdateProductMutation =
  CURRENT_DATA_SOURCE === DATA_SOURCE.FIREBASE
    ? useUpdateProductFirebase
    : useUpdateMockProductMutation;
