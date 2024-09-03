import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ConfigProvider } from 'antd';
import { getInvoicesListRef } from '../../api/firebaseRefs';
import { deleteInvoice } from '../../api/operations';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import useInvoiceStyleByType from '../../../../hook/useInvoiceStyleByType';
import useSearchParamState from '../../../../hook/useSearchParamState';
import CatalogContentWithBoundary from '../../../../modules/catalog';


const InvoiceListPage = () => {
  const { docType } = useParams();
  const [month, setMonth] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat,
    [docType] // Add docType as a dependency
  );

  const invoiceListRef = useMemo(
    () => getInvoicesListRef(month, docType),
    [month, docType]
  );
  const [data, loading, error] = useCollectionData(invoiceListRef);

  const {
    toolBarDetails: { title, primaryColor, secondaryColor, ImageComponent },
  } = useInvoiceStyleByType();

  const columnsObject = getInvoiceListColumns(deleteInvoice);

  const addToolBarItems = getToolBarItems(
    title,
    secondaryColor,
    ImageComponent,
    setMonth,
    docType
  );

  const isError = !!error;

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

export { InvoiceListPage };


