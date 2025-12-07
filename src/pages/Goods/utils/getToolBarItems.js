import React from 'react';
import { Typography, Grid } from 'antd';
import RadioGroupBool from '../../../components/radioGroup/RadioGroupBool';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import PriceListExcel from '../components/priceListExcel/PriceListExcel';
import { ModalToPrint } from '../../../features/printingDocs';
import { ReactComponent as GoodsIcon } from '../../../styles/icons/goods/GoodsIcon.svg';
import { ReactComponent as ProductIcon } from '../../../styles/icons/goods/ProductIcon.svg';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const getToolBarItems =
  (onStatusChange, data) => (handleSearchChange, searchTerm) => {
    const screens = Grid.useBreakpoint();
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
                component: screens.lg && (
                  <Typography.Title level={3} style={{ margin: 3 }}>
                    Список товаров
                  </Typography.Title>
                ),
              },
            ],
          },
          {
            name: 'radioGroup',
            component: screens.lg && (
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
                    typeData={FORM_TYPES.GOODS}
                    actionType={FORM_ACTIONS.CREATE}
                  />
                ),
              },
            ],
          },
          {
            name: 'search',
            component: (
              <SearchInput
                value={searchTerm}
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
            component: (
              <ModalToPrint
                data={{ productList: data }}
                type={FORM_TYPES.PRINT_PRICELIST}
              />
            ),
          },
        ],
      },
    ];
  };
