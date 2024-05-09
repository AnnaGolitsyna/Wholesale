import GoodsTable from '../components/table/GoodsTable';

const getAdditionalFieldsForInvoiceFormList = (form, actionType, data) => {
    const titleText = {
        create: 'Создание накладной',
        edit: 'Редактирование накладной',
    };
    return [
      {
        keyname: 'title',
        name: 'productList',
        component: <GoodsTable form={form}  />,
      },
    ];
}

export { getAdditionalFieldsForInvoiceFormList };