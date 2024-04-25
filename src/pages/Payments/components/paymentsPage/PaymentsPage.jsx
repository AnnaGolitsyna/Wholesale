import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getPaymentsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getThisMonth } from '../../../../utils/dateUtils';
import { getPaymentsListRef } from '../../api/firebaseRefs';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { deletePayment } from '../../api/operations';


const PaymentsPage = (props) => {
  const [month, setMonth] = useState(getThisMonth());

  const [payListRef, setPayListRef] = useState(getPaymentsListRef(month));
  const [payList, setPayList] = useState([]);
  useEffect(() => {
    // Update payListRef when month changes
    setPayListRef(getPaymentsListRef(month));
  }, [month]);

  // const [paymentList, loading, error, snapshot] =
  //   useCollectionData(paymentsListRef);
  const [paymentList, loading, error, snapshot] = useCollectionData(payListRef);

  useEffect(() => {
    setPayList(paymentList);
  }, [paymentList]);



  //console.log('paymentList', paymentList, loading, error, snapshot);

  const columnsObject = getPaymentsColumns(deletePayment);

  const addToolBarItems = getToolBarItems(setMonth, paymentList);

  const isError = error ? true : false;

  return (
    <>
      <CatalogContentWithBoundary
        data={payList}
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
