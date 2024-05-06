import GoodsTable from '../components/table/GoodsTable';

const getAdditionalFieldsForInvoiceFormList = (form, actionType) => {
    const titleText = {
        create: 'Создание накладной',
        edit: 'Редактирование накладной',
    };
    return [
      {
        keyname: 'title',
        name: 'productList',
        component: <GoodsTable />,
      },
    ];
}

export { getAdditionalFieldsForInvoiceFormList };