import { ReactComponent as DeliveryImage } from '../../../styles/images/DeliveryImage.svg';
import { ReactComponent as WarehouseImage } from '../../../styles/images/WarehouseImage.svg';

const invoiceStyle = {
  sale: {
    toolBarDetails: {
      title: 'Продажи',
      ImageComponent: <DeliveryImage />,
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
      ImageComponent: <WarehouseImage />,
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

export { invoiceStyle };
