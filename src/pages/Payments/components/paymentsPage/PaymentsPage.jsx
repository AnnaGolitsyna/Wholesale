import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getPaymentsListRef } from '../../api/firebaseRefs';
import { deletePayment } from '../../api/operations';
import { getPaymentsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getThisMonth } from '../../../../utils/dateUtils';
import CatalogContentWithBoundary from '../../../../modules/catalog';

const PaymentsPage = () => {
  const [month, setMonth] = useState(getThisMonth());
  const [payListRef, setPayListRef] = useState(getPaymentsListRef(month));
  const [payList, setPayList] = useState([]);
  const [data, loading, error] = useCollectionData(payListRef);

  useEffect(() => {
    setPayListRef(getPaymentsListRef(month));
  }, [month]);

  useEffect(() => {
    setPayList(data);
  }, [data]);

  const columnsObject = getPaymentsColumns(deletePayment);

  const addToolBarItems = getToolBarItems(setMonth);

  const isError = !!error;

  return (
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
  );
};

export { PaymentsPage };
