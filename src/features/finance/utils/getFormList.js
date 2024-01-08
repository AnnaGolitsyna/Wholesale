import {
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Space,
  Button,
  Radio,
} from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import SelectContractor from '../../catalog/components/selectContractor/SelectContractor';
import RadioGroup from '../components/radio/RadioGroup';

const getFieldsForPaymentsFormList = (form) => {
  const titleObj = {
    icon: <DollarOutlined style={{ fontSize: 50 }} />,
    titleText: {
      create: 'Создание новой транзакции',
      edit: 'Редактирование транзакции',
      'delete-row': 'Удаление транзакции',
    },
  };
  const formList = [
    {
      name: 'name',
      label: 'Поставщик',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите поставщика из списка' }],
      component: <SelectContractor form={form} />,
    },

    {
      name: 'type',
      label: 'Тип транзакции',
      rules: [{required: true, message: 'Выберите тип оплаты'}],
      component: <RadioGroup form={form} />,
    },

    {
      name: 'sum',
      label: 'Сумма оплаты',
      rules: [{ type: 'number' }],
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
      name: 'date',
      label: 'Даты реализации',
      component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
    },
  ];
  return { titleObj, formList };
};

export { getFieldsForPaymentsFormList };
