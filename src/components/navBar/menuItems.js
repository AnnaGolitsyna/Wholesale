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
    getItem('Реестр', 'clients/invoices'),

    getItem(
      'Создать новую',
      'g1',
      null,
      [getItem('Накладную', '2'), getItem('Сверку', '3')],
      'group'
    ),
  ]),
  getItem('Поставки', 'sub2', <ImportOutlined />, [
    getItem('Реестр', 'suppliers/invoices'),
    getItem(
      'Создать новую',
      'g2',
      null,
      [getItem('Накладную', '5'), getItem('Сверку', '6')],
      'group'
    ),
  ]),

  getItem('Касса', '7', <DollarOutlined />),
  getItem('Отчеты', 'sub3', <ProjectOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem(
    'Справочники',
    'grp',
    null,
    [
      getItem('Клиенты', 'contractors', <UsergroupAddOutlined />),
      getItem('Товары', '14', <BarcodeOutlined />),
    ],
    'group'
  ),
];

export { items };
