import GoodsTable from '../components/table/GoodsTable';

const getAdditionalFieldsForInvoiceFormList = (form, actionType, data) => {

    return [
      {
        keyname: 'goodsTable',
        name: 'productList',
        component: <GoodsTable form={form}  />,
      },
    ];
}

export { getAdditionalFieldsForInvoiceFormList };