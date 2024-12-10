import {
  ShoppingCartOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  ImportOutlined,
  BarcodeOutlined,
  DollarOutlined,
  HomeFilled,
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
    // getItem(
    //   'Создать новую',
    //   'g1',
    //   null,
    //   [getItem('Накладную', '2'), getItem('Сверку', '3')],
    //   'group'
    // ),
  ]),
  getItem('Поставки', 'sub2', <ImportOutlined />, [
    getItem('Реестр', 'invoices/purchase'),
    // getItem(
    //   'Создать новую',
    //   'g2',
    //   null,
    //   [getItem('Накладную', '5'), getItem('Сверку', '6')],
    //   'group'
    // ),
  ]),
  getItem('Касса', 'payments', <DollarOutlined />),
  getItem('Отчеты', 'sub3', <ProjectOutlined />, [
    getItem('Дебиторка', 'receivables'),
  ]),
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
