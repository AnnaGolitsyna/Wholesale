import { theme } from 'antd';

const { useToken } = theme;

const useInvoiceStyleByType = (type) => {
  const { token } = useToken();

  const invoiceStyle = {
    sale: {
      title: 'Продажи',
      primaryColor: token.saleInvoiceBg,
      secondaryColor: token.saleInvoiceAccent,
      imageRef: '/clients.svg',
    },
    purchase: {
      title: 'Закупки',
      primaryColor: token.purchaseInvoiceBg,
      secondaryColor: token.purchaseInvoiceAccent,
      imageRef: '/suppliers.svg',
    },
  };

  return invoiceStyle[type];

};

export default useInvoiceStyleByType;
