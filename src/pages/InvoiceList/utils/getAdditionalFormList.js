import { Table } from 'antd';

const getAdditionalFieldsForInvoiceFormList = (form, actionType) => {
    const titleText = {
        create: 'Создание накладной',
        edit: 'Редактирование накладной',
    };
    return [
        {
            keyname: 'title',
            name: 'productList',
            component: <Table dataSource={[] } columns={[]} />
        }
    ]
}

export { getAdditionalFieldsForInvoiceFormList };