import GoodsTable from '../components/table/GoodsTable';
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
      component: <GoodsTable form={form} />,
    },
  ];
};

export { getAdditionalFieldsForInvoiceFormList };
