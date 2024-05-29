import { categoryPricesObj } from '../utils/priceUtils';

const { superBulk, bulk, retail, cost } = categoryPricesObj;

const categoryContractor = [
  {
    label: 'Покупатель',
    value: 'buyer',
    color: '#87d068',
    children: [superBulk, bulk, retail],
    invoiceType: ['sale'],
  },
  {
    label: 'Поставщик',
    value: 'supplier',
    color: '#108ee9',
    children: [cost],
    invoiceType: ['purchase'],
  },
  {
    label: 'Универсальный',
    value: 'all-purpose',
    color: '#2db7f5',
    children: [superBulk, bulk],
    invoiceType: ['sale', 'purchase'],
  },
];

export { categoryContractor };
