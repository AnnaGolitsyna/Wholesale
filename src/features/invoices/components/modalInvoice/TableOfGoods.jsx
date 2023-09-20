import React from 'react';
import { Table, ConfigProvider } from 'antd';
// import PropTypes from 'prop-types'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const TableOfGoods = ({ bgColorDark, bgColorLight }) => {
  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          colorPrimary: bgColorDark,
        },
        components: {
          Table: {
            colorBgContainer: bgColorLight,
            colorFillAlter: bgColorDark,
          },
        },
      }}
    >
      <Table dataSource={dataSource} columns={columns} />
    </ConfigProvider>
  );
};

// TableOfGoods.propTypes = {}

export default TableOfGoods;
