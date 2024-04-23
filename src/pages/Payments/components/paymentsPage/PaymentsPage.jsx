import React from 'react';
import PropTypes from 'prop-types';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getPaymentsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import {paymentsListRef} from '../../api/gateway';
import {useCollectionData} from 'react-firebase-hooks/firestore';

const PaymentsPage = (props) => {
  const [paymentList, loading, error, snapshot] = useCollectionData(paymentsListRef);

  //console.log('paymentList', paymentList, loading, error, snapshot);

  const columnsObject = getPaymentsColumns(paymentList);

  const addToolBarItems = getToolBarItems(paymentList);

  const isError = error ? true : false;

  return (
    <>
      <CatalogContentWithBoundary
        data={paymentList}
        isLoading={loading}
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


  // const data = [
  //   {
  //     id: 1,
  //     key: 1,
  //     docNumber: 'P0424-001',
  //     name: {
  //       value: '5',
  //       label: 'Пресс-курьер',
  //     },
  //     type: 'debet',
  //     sum: 123,
  //     date: '2024-04-23',
  //   },
  // ];