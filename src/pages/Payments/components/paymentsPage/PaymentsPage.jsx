import React from 'react';
import PropTypes from 'prop-types';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getPaymentsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';

const PaymentsPage = (props) => {
  const data = [
    {
      id: 1,
      key: 1,
      name: 'test',
      type: 'debet',
      sum: 123,
      date: '12.12.2020',
    },
  ];
  const isLoading = false;
  const isError = false;
  const error = null;

  const columnsObject = getPaymentsColumns(data);

  const addToolBarItems = getToolBarItems(data);

  return (
    <>
      <CatalogContentWithBoundary
        data={data}
        isLoading={isLoading}
        errors={{
          isError,
          error,
        }}
        columnsObject={columnsObject}
        addToolBarItems={addToolBarItems}
      />
    </>
  );
};

PaymentsPage.propTypes = {};

export { PaymentsPage };
