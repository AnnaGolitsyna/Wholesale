import { Typography, Input, Select, DatePicker, InputNumber } from 'antd';
import { customProductsList } from '../constants/customProductsList';
import { ReactComponent as TemporaryIcon } from '../../../styles/icons/template/TemporaryIcon.svg';
import { formatWithDots, parseWithDots } from '../../../utils/priceUtils';
import SelectCustomValue from '../components/select/SelectCustomValue';

const getEmptyFieldFormList = () => {
  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <TemporaryIcon />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={3} style={{ margin: 15 }}>
              {'Добавление товара без внесения в каталог'}
            </Typography.Title>
          ),
        },
      ],
    },

    {
      name: 'name',
      keyname: 'name',
      label: 'Название',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите товар из списка' }],
      // component: <Select options={customProductsList} />,
      component: <SelectCustomValue name="name" />,
    },
    {
      name: 'number',
      keyname: 'number',
      label: 'Номер',
      component: <Input />,
    },
    {
      name: 'dateStart',
      keyname: 'dateStart',
      label: 'В реализации',
      component: <DatePicker />,
    },
    {
      keyname: 'priceBlock',
      children: [
        {
          name: 'selectedPrice',
          keyname: 'selectedPrice',
          label: 'Цена продажи',
          hasFeedback: true,
          rules: [{ required: true, message: 'Выберите цену продажи' }],
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
              onChange={formatWithDots}
              parser={parseWithDots}
            />
          ),
        },
        {
          name: 'cost',
          keyname: 'cost',
          label: 'Цена закупки',
          hasFeedback: true,
          rules: [
            {
              warningOnly: true,
              message:
                'Если не выбрать цену закупки, то цена закупки = цена продажи',
            },
          ],
          component: <InputNumber />,
        },
      ],
    },

    {
      name: 'count',
      keyname: 'count',
      label: 'Количество',
      rules: [{ required: true, message: 'Выберите количество' }],
      component: <InputNumber />,
    },
  ];
};

export { getEmptyFieldFormList };
