import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ConfigProvider } from 'antd';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { getThisMonth } from '../../../../utils/dateUtils';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';
import { getInvoicesListRef } from '../../api/firebaseRefs';
const InvoiceListPage = () => {
  const [month, setMonth] = useState(getThisMonth());
  const [invoiceListRef, setInvoiceListRef] = useState(
    getInvoicesListRef(month)
  );
  const [invoiceList, setInvoiceList] = useState([]);

  const [data, loading, error] = useCollectionData(invoiceListRef);

  useEffect(() => {
    setInvoiceListRef(getInvoicesListRef(month));
  }, [month]);

  useEffect(() => {
    setInvoiceList(data);
  }, [data]);

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
        data={invoiceList}
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
