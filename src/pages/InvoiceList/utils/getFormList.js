import { Typography, Input, InputNumber, DatePicker, Table } from 'antd';
import {validateModifyingDate} from '../../../utils/dateUtils';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import FileIcon from '../../../styles/icons/FileIcon';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
  const titleText = {
    create: 'Создание нового документа',
    edit: 'Редактирование документа',
  };
  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <FileIcon />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={3}>
              {titleText[actionType] || 'Просмотр информации'}
            </Typography.Title>
          ),
        },
      ],
    },
    {
      keyname: 'transactionId',
      children: [
        {
          name: 'docNumber',
          keyname: 'docNumber',
          label: 'Номер документа',
          component: <Input disabled />,
        },
        {
          keyname: 'date',
          name: 'date',
          label: 'Даты реализации',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
          rules: [
            {
              required: true,
              message: 'Выберите дату',
            },
            () => ({
              validator(_, value) {
                return validateModifyingDate(data, value);
              },
            }),
          ],
        },
      ],
    },
    {
      keyname: 'name',
      name: 'name',
      label: 'Наименование контрагента',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите поставщика из списка' }],
      component: <TreeSelectContractor form={form} data={data} />,
    },
    {
      keyname: 'type',
      name: 'type',
      label: 'Тип транзакции',
      rules: [{ required: true, message: 'Выберите тип оплаты' }],
      component: <Input />,
      //   <RadioGroup form={form} data={data} />,
    },
    {
      keyname: 'table',
      name: 'productList',
      label: 'Товары',
      rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
      component: (
        <Table
          dataSource={data?.productList}
          columns={
            [
                 {
                   title: 'Товар',
                   dataIndex: 'name',
                   key: 'name',
                 },
                 {
                   title: 'Цена',
                   dataIndex: 'price',
                   key: 'price',
                 },
                 {
                   title: 'Количество',
                   dataIndex: 'count',
                   key: 'count',
                 },
                 {
                   title: 'Сумма',
                   dataIndex: 'sum',
                   key: 'sum',
                  // render: (text) => text && getShortDateFormat(text),
                 },
            ]
          }
        />
      ),
    },

    {
      keyname: 'sum',
      name: 'sum',
      label: 'Сумма оплаты',
      rules: [{ type: 'number', required: true, message: 'Заполните сумму' }],
      component: (
        <InputNumber
          placeholder="сумма оплаты"
          style={{
            width: '100%',
          }}
          step={0.01}
        />
      ),
    },

    {
      name: 'id',
      keyname: 'id',
      label: 'ID',
      component: <Input disabled />,
    },
  ];
};

export { getFieldsForInvoiceFormList };
