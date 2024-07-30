import { ReactComponent as DeliveryImage } from '../../../styles/images/DeliveryImage.svg';
import { ReactComponent as WarehouseImage } from '../../../styles/images/WarehouseImage.svg';
import { operationTypes } from '../../../constants/operationTypes';

const invoiceStyle = {
  sale: {
    toolBarDetails: {
      title: 'Продажи',
      ImageComponent: <DeliveryImage />,
    },
    modalDetails: operationTypes.sale.modalDetails,
  },
  purchase: {
    toolBarDetails: {
      title: 'Закупки',
      ImageComponent: <WarehouseImage />,
    },
    modalDetails: operationTypes.purchase.modalDetails,
  },
};

export { invoiceStyle };
