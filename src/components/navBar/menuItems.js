import {
  ShoppingCartOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  ImportOutlined,
  BarcodeOutlined,
  DollarOutlined,
  HomeFilled,
  SolutionOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('На главную', '/', <HomeFilled />),
  getItem('Продажи', 'sub1', <ShoppingCartOutlined />, [
    getItem('Реестр', 'invoices/sale'),
 
  ]),
  getItem('Поставки', 'sub2', <ImportOutlined />, [
    getItem('Реестр', 'invoices/purchase'),
  
  ]),
  
  getItem('Финансы', 'sub3', <DollarOutlined />, [
    getItem('Касса', 'payments'),
    getItem('План', 'finances'),
  ]),
  getItem('Отчеты', 'sub4', <ProjectOutlined />, [
    getItem('Дебиторка', 'receivables'),
  ]),
  getItem(
    'Учет заказов',
    'grp',
    null,
    [
     
      getItem('Заказы', 'orders', <SolutionOutlined />),
    ],
    'group'
  ),
  getItem(
    'Справочники',
    'grp',
    null,
    [
      getItem('Клиенты', 'contractors', <UsergroupAddOutlined />),
      getItem('Товары', 'goods', <BarcodeOutlined />),
      
    ],
    'group'
  ),
];

export { items };
