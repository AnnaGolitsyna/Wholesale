import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { getThisMonth } from '../../../../utils/dateUtils';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';

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
    docNumber: 'P-001',
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
    docNumber: 'P-002',
  },
];
const InvoiceListPage = () => {
  const [month, setMonth] = useState(getThisMonth());
 // const { type } = useParams();

  //console.log('type', type);

  const loading = false;
  const error = null;
  const isError = false;

  const {
    toolBarDetails: { title, primaryColor, secondaryColor, imageRef },
  } = useInvoiceStyleByType();

  const columnsObject = getInvoiceListColumns();
  const addToolBarItems = getToolBarItems(
    title,
    secondaryColor,
    imageRef,
    setMonth
  );
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
