import React, { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getPaymentsListRef } from '../../api/firebaseRefs';
import { deletePayment } from '../../api/operations';
import { getPaymentsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import  useSearchParamState  from '../../../../hook/useSearchParamState';
import CatalogContentWithBoundary from '../../../../modules/catalog';

const PaymentsPage = () => {

  const [month, setMonth] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat,
  
  );

  const payListRef = useMemo(
    () => getPaymentsListRef(month),
    [month]
  );
  const [data, loading, error] = useCollectionData(payListRef);

  const columnsObject = getPaymentsColumns(deletePayment);

  const addToolBarItems = getToolBarItems(setMonth);

  const isError = !!error;

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

export { PaymentsPage };


