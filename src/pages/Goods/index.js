export { GoodsPage as default } from './components/goodsPage/GoodsPage.jsx';

export {
  goodsApi,
  useGetGoodsListQuery,
  useAddGoodsMutation,
  useUpdateProductMutation,
} from './api/goodsApi';
export { getFieldsForGoodsFormList } from './utils/getFormList.js';
export { getPriceListColumns } from './utils/getPriceListColumns';

