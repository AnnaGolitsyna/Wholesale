import { useParams } from 'react-router-dom';
import { theme } from 'antd';

const { useToken } = theme;

const useInvoiceStyleByType = () => {
  const { docType } = useParams();
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
          titleText: 'Расходная накладная (покупателю)',
          titleToPrint: 'Видаткова накладна',
          radioBtnText: 'Продажа товара покупателю',
        },
        credit: {
          titleText: 'Возвратная накладная (на склад)',
          titleToPrint: 'Накладна на повернення (на склад)',
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
          titleText: 'Возвратная накладная (поставщику)',
          titleToPrint: 'Накладна на повернення (постачальнику)',
          radioBtnText: 'Возврат поставщику',
        },
        credit: {
          titleText: 'Приходная накладная (от поставщика)',
          titleToPrint: 'Накладна на отримання товару',
          radioBtnText: 'Приход от поставщика',
        },
      },
    },
  };

  return invoiceStyle[docType];
};

export default useInvoiceStyleByType;
