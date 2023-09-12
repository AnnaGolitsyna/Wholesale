import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import {
  ShoppingCartOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  ImportOutlined,
  BarcodeOutlined,
  DollarOutlined,
  HomeFilled,
} from '@ant-design/icons';
import { Menu } from 'antd';


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
  getItem(<Link to="/">На главную</Link>, 'home', <HomeFilled />),
  getItem('Продажи', 'sub1', <ShoppingCartOutlined />, [
    getItem(<Link to="clients/invoices">Реестр</Link>, '1'),

    getItem(
      'Создать новую',
      'g2',
      null,
      [getItem('Накладную', '2'), getItem('Сверку', '3')],
      'group'
    ),
  ]),
  getItem('Поставки', 'sub2', <ImportOutlined />, [
    getItem('Реестр', '4'),
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
      getItem('Клиенты', '13', <UsergroupAddOutlined />),
      getItem('Товары', '14', <BarcodeOutlined />),
    ],
    'group'
  ),
];

const NavBar = () => {
  const onClick = (e) => {
    console.log('click ', e.key);
  };
  return (
    <Layout.Sider>
      <Menu
        onClick={onClick}
        style={{
          // width: '100%',
          backgroundColor: 'transparent',
        }}
        // defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      ></Menu>
    </Layout.Sider>
  );
};

export default NavBar;

/* <Space direction="vertical" size="small" style={{ padding: '20px' }}>
        <Divider>Клиенты</Divider>
        <Link to="clients/get">
          <PlusSquareFilled style={{ marginRight: '10px' }} />
          <span>Расходные накладные</span>
        </Link>
        <Link to="*">
          <MinusSquareFilled style={{ marginRight: '10px' }} />
          <span>Возврат на склад</span>
        </Link>

        <Divider>Поставщики</Divider>
        <Link to="*">
          <PlusSquareFilled style={{ marginRight: '10px' }} />
          <span>Приходные накладные</span>
        </Link>
        <Link to="*">
          <MinusSquareFilled style={{ marginRight: '10px' }} />
          <span>Возврат поставщику</span>
        </Link>

        <Divider>Касса</Divider>
        <Link to="*">
          <PlusSquareFilled style={{ marginRight: '10px' }} />
          <span>Приход в кассу</span>
        </Link>
        <Link to="*">
          <MinusSquareFilled style={{ marginRight: '10px' }} />
          <span>Расход из кассы</span>
        </Link>

        <Divider>Отчеты</Divider>
        <Link to="*">Сверка с контрагентом</Link>
        <Link to="*">Сводный отчет по всем контрагентам</Link>
        <Link to="*">Список товаров</Link>
      </Space> */
