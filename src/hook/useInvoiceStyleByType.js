import { useParams } from 'react-router-dom';
import { theme } from 'antd';
import { invoiceStyle } from '../pages/InvoiceList/constants/invoiceStyle';

const { useToken } = theme;

const useInvoiceStyleByType = () => {
  const { docType } = useParams();
  const { token } = useToken();

  const toolBarDetails = invoiceStyle[docType]?.toolBarDetails;
  const modalDetails = invoiceStyle[docType]?.modalDetails;
  const primaryColor =
    docType === 'sale' ? token.saleInvoiceBg : token.purchaseInvoiceBg;
  const secondaryColor =
    docType === 'sale' ? token.saleInvoiceAccent : token.purchaseInvoiceAccent;

  return {
    toolBarDetails: { ...toolBarDetails, primaryColor, secondaryColor },
    modalDetails,
  };
};

export default useInvoiceStyleByType;
