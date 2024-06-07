import GoodsTable from '../components/table/GoodsTable';
import GoodsAddition from '../components/goodsAddition/GoodsAddition';
import TitleBlockForGoodsTable from '../components/titleBlock/TitleBlockForGoodsTable';
const getAdditionalFieldsForInvoiceFormList = (form, actionType, data) => {
  return [
    {
      keyname: 'title',
      component: <TitleBlockForGoodsTable />,
    },
    {
      keyname: 'goodsTable',
      name: 'productList',
     // component: <GoodsTable form={form} />,
     component: <GoodsAddition />
    },
  ];
};

export { getAdditionalFieldsForInvoiceFormList };
