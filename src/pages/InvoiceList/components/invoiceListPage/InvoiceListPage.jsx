import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ConfigProvider } from 'antd';
import { getInvoicesListRef } from '../../api/firebaseRefs';
import { deleteInvoice } from '../../api/operations';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { getInvoiceListColumns } from '../../utils/getColumns';
import { getThisMonth } from '../../../../utils/dateUtils';
import useInvoiceStyleByType from '../../../../hook/useInvoiceStyleByType';
import CatalogContentWithBoundary from '../../../../modules/catalog';

const InvoiceListPage = () => {
  const [month, setMonth] = useState(getThisMonth());
  const [invoiceListRef, setInvoiceListRef] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);

  const [data, loading, error] = useCollectionData(invoiceListRef);

  const { docType } = useParams();

  useEffect(() => {
    setInvoiceListRef(getInvoicesListRef(month, docType));
  }, [month, docType]);

  useEffect(() => {
    setInvoiceList(data);
  }, [data]);

  const {
    toolBarDetails: { title, primaryColor, secondaryColor, ImageComponent },
  } = useInvoiceStyleByType();

  const columnsObject = getInvoiceListColumns(deleteInvoice);

  const addToolBarItems = getToolBarItems(
    title,
    secondaryColor,
    ImageComponent,
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
