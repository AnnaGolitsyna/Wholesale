import React from 'react';
import PropTypes from 'prop-types';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';


const InvoiceListPage = () => {
  const data = [
    {
      key: '1',
      name: {
        value: '5',
        label: 'Пресс-курьер',
      },
      type: 'debet',
      date: '2024-04-10',
      sum: '1500',
      productList: [
        {
          key: '1-1',
          name: 'Тещин компот',
          price: '200',
          count: '10',
          sum: '2000',
        },
        {
          key: '1-2',
          name: 'Веселий дачник',
          price: '100',
          count: '10',
          sum: '2000',
        },
      ],
    },
    {
      key: '2',
      name: {
        value: '7',
        label: 'Публика',
      },
      type: 'credit',
      date: '2024-04-15',
      sum: '500',
    },
  ];
  const loading = false;
  const error = null;
  const isError = false;

  const columnsObject = getInvoiceListColumns();
  const addToolBarItems = getToolBarItems();
  return (
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
  );
};

InvoiceListPage.propTypes = {};

export { InvoiceListPage };
