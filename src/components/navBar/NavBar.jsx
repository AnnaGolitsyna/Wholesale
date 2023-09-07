import React from 'react';
import { Divider, Layout, Space } from 'antd';
import { PlusSquareFilled, MinusSquareFilled } from '@ant-design/icons';
import { brandTheme } from '../../styles/brandTheme';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Layout.Sider>
      <Space direction="vertical" size="small" style={{ padding: '20px' }}>
        <Divider>Клиенты</Divider>
        <Link to="bills">
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
      </Space>
    </Layout.Sider>
  );
};

export default NavBar;
