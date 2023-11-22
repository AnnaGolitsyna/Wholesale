import { Input, DatePicker, Checkbox, Select } from 'antd';

const getGoodsFormList = (props) => [
  {
    name: 'name',
    label: 'Наименование',
    component: <Input placeholder="наименование товара" />,
    rules: [{ required: true, message: 'Заполните обязательное поле' }],
    hasFeedback: true,
  },
  {
    name: 'fullName',
    label: 'Полное наименование',
    component: (
      <Input.TextArea
        placeholder="полное наиенование товара (для документов)"
        rows={1}
      />
    ),
    rules: [{ required: true, message: 'Заполните обязательное поле' }],
    hasFeedback: true,
  },
  {
    name: 'supplier',
    label: 'Поставщик',
    hasFeedback: true,
    rules: [{ required: true, message: 'Выберите поставщика из списка' }],
    component: (
      <Select
        placeholder="выбери поставщика"
        // options={categoryContractor}
        // onChange={onChange}
      />
    ),
  },
  {
    name: 'cost',
    label: 'Цена закупки',
    rules: [{ type: 'number' }],
    component: <Input placeholder="цена закупки" />,
  },
  {
    name: 'superBulk',
    label: 'Цена для крупного опта',
    rules: [{ type: 'number' }],
    component: <Input placeholder="цена для крупного опта" />,
  },
  {
    name: 'bulk',
    label: 'Цена для опта',
    rules: [{ type: 'number' }],
    component: <Input placeholder="цена для опта" />,
  },
  {
    name: 'retail',
    label: 'Цена для розницы',
    rules: [{ type: 'number' }],
    component: <Input placeholder="цена для розницы" />,
  },
  {
    label: 'Дата поступления в реализацию',
    name: 'dateStart',
    component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
  },
  {
    label: 'Дата снятия с реализации',
    name: 'dateEnd',
    component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
  },
  {
    name: 'active',
    valuePropName: 'checked',
    component: <Checkbox>Товар в реализации</Checkbox>,
  },
];

export { getGoodsFormList };