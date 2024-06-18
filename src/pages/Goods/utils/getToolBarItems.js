import React from 'react';
import { Typography } from 'antd';
import RadioGroupBool from '../../../components/radioGroup/RadioGroupBool';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import PriceListExcel from '../components/priceListExcel/PriceListExcel';
import { ModalToPrint } from '../../../features/printingDocs';
import { ReactComponent as GoodsIcon } from '../../../styles/icons/goods/GoodsIcon.svg';
import { ReactComponent as ProductIcon } from '../../../styles/icons/goods/ProductIcon.svg';

export const getToolBarItems =
  (onStatusChange, data) => (handleSearchChange) => {
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
                component: <GoodsIcon />,
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
        name: 'toolsBar1',
        direction: 'vertical',
        children: [
          {
            name: 'createBtn',
            children: [
              {
                name: 'iconProduct',
                component: <ProductIcon />,
              },
              {
                name: 'btn',
                component: (
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
                onChange={handleSearchChange}
                placeholder={'наименование товара'}
              />
            ),
          },
        ],
      },
      {
        name: 'toolsBar2',
        direction: 'vertical',
        children: [
          {
            name: 'excelBtn',
            component: <PriceListExcel productsList={data} />,
          },
          {
            name: 'printBtn',
            component: <ModalToPrint type="priceList" />,
          },
        ],
      },
    ];
  };
