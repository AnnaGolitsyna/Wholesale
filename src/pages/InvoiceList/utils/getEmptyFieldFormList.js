import { Typography, Input } from 'antd';
import FileIcon from '../../../styles/icons/FileIcon';

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
      component: <Input />,
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
      component: <Input />,
    },
    {
      name: 'selectedPrice',
      keyname: 'selectedPrice',
      label: 'Цена',
      component: <Input />,
    },

    {
      name: 'count',
      keyname: 'count',
      label: 'Количество',
      component: <Input />,
    },
  ];
};

export { getEmptyFieldFormList };
