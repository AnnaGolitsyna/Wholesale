import React from 'react';
import { Typography, Button } from 'antd';
import NewspaperIcon from '../../../styles/icons/NewspaperIcon';
import NewItemIcon from '../../../styles/icons/NewItemIcon';
import RadioGroupBool from '../../../components/radioGroup/RadioGroupBool';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';

export const getToolBarItems = (onStatusChange, handleChange) => {
  return [
    {
      name: 'infoGroup',
      direction: 'vertical',
      children: [
        {
          name: 'title',
          children: [
            {
              name: 'icon',
              component: (
                <NewspaperIcon
                  style={{
                    fontSize: 100,
                  }}
                />
              ),
            },
            {
              name: 'title',
              component: (
                <Typography.Title level={3} style={{ margin: 3 }}>
                  Список товаров
                </Typography.Title>
              ),
            },
          ],
        },
        {
          name: 'radioGroup',
          component: (
            <RadioGroupBool
              onChange={onStatusChange}
              textObj={{
                true: 'Товары в реализации',
                false: 'Сняты с реализации',
              }}
            />
          ),
        },
      ],
    },
    {
      name: 'actionsGroup',
      direction: 'vertical',
      children: [
        {
          name: 'createBtn',
          children: [
            {
              name: 'iconProduct',
              component: <NewItemIcon />,
            },
            {
              name: 'btn',
              component: (
                // <Button
                //   type="primary"
                //   onClick={() => getItemData(null, 'create')}
                // >
                //   Создать нового
                // </Button>
                <ModalModifyItems
                  data={null}
                  typeData="Goods"
                  actionType="create"
                />
              ),
            },
          ],
        },
        {
          name: 'search',
          component: (
            <SearchInput
              onChange={handleChange}
              placeholder={'наименование товара'}
            />
          ),
        },
      ],
    },
  ];
};
