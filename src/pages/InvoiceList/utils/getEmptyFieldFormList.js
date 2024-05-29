import { Typography, Input, Select, DatePicker, InputNumber } from 'antd';
import FileIcon from '../../../styles/icons/FileIcon';
import { customProductsList } from '../constants/customProductsList';

const getEmptyFieldFormList = () => {
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
      component: <Select options={customProductsList} />,
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
          component: <InputNumber />,
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
