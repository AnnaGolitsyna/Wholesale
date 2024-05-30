import { theme } from 'antd';

const { useToken } = theme;

const useInvoiceStyleByType = (type) => {
  const { token } = useToken();

  const invoiceStyle = {
    sale: {
      toolBarDetails: {
        title: 'Продажи',
        primaryColor: token.saleInvoiceBg,
        secondaryColor: token.saleInvoiceAccent,
        imageRef: '/clients.svg',
      },
      modalDetails: {
        debet: {
          titleText: 'Создание расходной накладной',
          radioBtnText: 'Продажа товара покупателю',
        },
        credit: {
          titleText: 'Создание возвратной накладной',
          radioBtnText: 'Возврат на склад от покупателя',
        },
      },
    },
    purchase: {
      toolBarDetails: {
        title: 'Закупки',
        primaryColor: token.purchaseInvoiceBg,
        secondaryColor: token.purchaseInvoiceAccent,
        imageRef: '/suppliers.svg',
      },
      modalDetails: {
        debet: {
          titleText: 'Создание возвратной накладной',
          radioBtnText: 'Возврат поставщику',
        },
        credit: {
          titleText: 'Создание приходной накладной',
          radioBtnText: 'Приход от поставщика',
        },
      },
    },
  };

  return invoiceStyle[type];
};

export default useInvoiceStyleByType;
