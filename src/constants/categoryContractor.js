import { categoryPricesObj } from '../utils/priceUtils';
import { ReactComponent as AllPurposeIcon } from '../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../styles/icons/category/SupplierIcon.svg';

const { superBulk, bulk, retail, cost } = categoryPricesObj;

const categoryContractor = [
  {
    label: 'Покупатель',
    value: 'buyer',
    color: '#87d068',
    children: [superBulk, bulk, retail],
    invoiceType: ['sale'],
    icon: <BuyerIcon />,
  },
  {
    label: 'Поставщик',
    value: 'supplier',
    color: '#108ee9',
    children: [cost],
    invoiceType: ['purchase'],
    icon: <SupplierIcon />,
  },
  {
    label: 'Универсальный',
    value: 'all-purpose',
    color: '#2db7f5',
    children: [superBulk, bulk],
    invoiceType: ['sale', 'purchase'],
    icon: <AllPurposeIcon />,
  },
];

const categoryStock = {
  stock: {
    label: 'Склад',
    value: 'stock',
  },
  shop: {
    label: 'Магазин',
    value: 'shop',
  },
};

export { categoryContractor, categoryStock };
