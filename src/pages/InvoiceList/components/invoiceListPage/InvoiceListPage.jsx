import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { ConfigProvider } from 'antd';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';
import { getThisMonth } from '../../../../utils/dateUtils';

const data = [
  {
    key: '1',
    name: {
      value: '5',
      label: 'Пресс-курьер',
    },
    priceType: {
      value: 'cost',
      label: 'закупка',
    },

    type: 'debet',
    date: '',
    sum: '1500',
    productList: [
      {
        key: '1-1',
        name: 'Тещин компот',
        number: '12/24',
        selectedPrice: '200',
        count: '10',
        sumRow: '2000',
      },
      {
        key: '1-2',
        name: 'Веселий дачник',
        number: '10/24',
        selectedPrice: '100',
        count: '10',
        sumRow: '2000',
      },
    ],
  },
  {
    key: '2',
    name: {
      value: '7',
      label: 'Публика',
    },
    priceType: {
      value: 'cost',
      label: 'закупка',
    },
    type: 'credit',
    date: '',
    sum: '500',
  },
];
const InvoiceListPage = ({type}) => {
   const [month, setMonth] = useState(getThisMonth());
  const loading = false;
  const error = null;
  const isError = false;

  const { title, primaryColor, secondaryColor, imageRef } =
    useInvoiceStyleByType(type);

  const columnsObject = getInvoiceListColumns();
  const addToolBarItems = getToolBarItems(title, secondaryColor, imageRef, setMonth);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: primaryColor,
        },
      }}
    >
      <CatalogContentWithBoundary
        data={data}
        isLoading={loading}
        errors={{
          isError,
          error,
        }}
        columnsObject={columnsObject}
        addToolBarItems={addToolBarItems}
      />
    </ConfigProvider>
  );
};

InvoiceListPage.propTypes = {};

export { InvoiceListPage };
