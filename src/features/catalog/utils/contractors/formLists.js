import { Input, DatePicker, Checkbox, Select } from 'antd';
import { categoryContractor } from './categoryContractor';

const getContractorsFormList = (onChange) => [
  {
    name: 'name',
    label: 'Наименование',
    component: <Input placeholder="сокращенное имя компании" />,
    rules: [{ required: true, message: 'Заполните обязательное поле' }],
    hasFeedback: true,
  },
  {
    name: 'fullName',
    label: 'Полное наименование',
    component: (
      <Input.TextArea
        placeholder="полное наиенование компании (для документов)"
        rows={2}
      />
    ),
    rules: [{ required: true, message: 'Заполните обязательное поле' }],
    hasFeedback: true,
  },
  {
    name: 'category',
    label: 'Категория контрагента',
    hasFeedback: true,
    rules: [{ required: true, message: 'Выберите категорию из списка' }],
    component: (
      <Select
        placeholder="выбери категорию"
        options={categoryContractor}
        onChange={onChange}
      />
    ),
  },

  {
    name: 'categoryPrice',
    label: 'Категория цен',
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: 'Выберите категорию из списка',
      },
    ],
    condition: 'category',
    component: (optionsPrices) => (
      <Select placeholder="выбери категорию цен" options={optionsPrices} />
    ),
  },

  {
    label: 'E-mail',
    name: 'email',
    rules: [{ type: 'email' }],
    component: <Input placeholder="e-mail" />,
  },
  {
    label: 'Tелефон',
    name: 'phone',
    component: <Input placeholder="номер телефона" />,
  },
  {
    label: 'Код ОКППО/ИНН',
    name: 'taxNumber',
    tooltip: 'Налоговый код',
    rules: [
      {
        type: 'number',
        message: 'Введите только числа',
        validator: (rule, value) => {
          if (!value || /^[0-9]+$/.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject('Введите только числа');
        },
      },
    ],
    component: <Input placeholder="налоговый код" />,
  },
  {
    label: 'Договор №',
    name: 'contractNumber',
    component: <Input placeholder="номер договора" />,
  },
  {
    label: 'от',
    name: 'date',
    component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
  },
  {
    label: 'Адрес',
    name: 'adress',
    component: (
      <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
    ),
  },
  {
    name: 'active',
    valuePropName: 'checked',
    component: <Checkbox>Активный контрагент</Checkbox>,
  },
];

export { getContractorsFormList };
