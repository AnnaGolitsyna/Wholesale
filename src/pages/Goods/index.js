export { GoodsPage } from './components/goodsPage/GoodsPage.jsx';

export {
  goodsApi,
  useGetGoodsListQuery,
  useAddGoodsMutation,
  useUpdateProductMutation,
} from './api/goodsApi';
export { getFieldsForGoodsFormList } from './utils/getFormList.js';


export { modalGoodsReducer } from './api/goodsSlice';