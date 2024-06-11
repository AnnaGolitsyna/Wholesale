import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ConfigProvider } from 'antd';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { getThisMonth } from '../../../../utils/dateUtils';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';
import { getInvoicesListRef } from '../../api/firebaseRefs';
import { useParams } from 'react-router-dom';
const InvoiceListPage = () => {
  const [month, setMonth] = useState(getThisMonth());
  const [invoiceListRef, setInvoiceListRef] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);

  const [data, loading, error] = useCollectionData(invoiceListRef);

  const { docType } = useParams();
  useEffect(() => {
    setInvoiceListRef(getInvoicesListRef(month, docType));
  }, [month]);

  useEffect(() => {
    setInvoiceList(data);
  }, [data]);

  console.log(docType, invoiceList);

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
