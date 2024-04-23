import { Input, InputNumber, DatePicker, Checkbox, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import RadioGroup from '../components/radio/RadioGroup';

const getFieldsForPaymentsFormList = (form, actionType, data) => {
  const titleText = {
    create: 'Создание новой транзакции',
    edit: 'Редактирование транзакции',
    delete: 'Удаление транзакции',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <DollarOutlined style={{ fontSize: 70 }} />,
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
          rules: [{ required: true, message: 'Выберите дату' }],
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
      component: <RadioGroup form={form} data={data} />,
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

export { getFieldsForPaymentsFormList };
