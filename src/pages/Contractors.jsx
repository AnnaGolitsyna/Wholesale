import React from 'react';
import { contractor } from '../gateway/contractor';
import { Typography, Table, Button, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types'
//  {
//     id: '1',
//     name: 'Пресс-Курьер',
//     fullName: `ТОВ "Пресс-Кур'єр Україна"`,
//     category: 'supplier',
//     taxNumber: '34494387',
//     contractNumber: '81/D',
//     contractDate: '',
//     email: '',
//     phone: '044-495-48-43',
//     adress: '04053, м.Київ, пров.Киянівський, буд.3-7',
//   },

const columns = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];



const Contractors = () => {
  return (
    <>
      <Space.Compact
        block
        style={{ alignItems: 'baseline', justifyContent: 'space-evenly' }}
      >
        <Typography.Title level={3}>Список контрагентов</Typography.Title>
        <Space size="middle">
          <UserAddOutlined style={{color: '#30c0c4', fontSize: 30}}/>
          <Button type="primary">Создать нового</Button>
        </Space>
      </Space.Compact>
      <Table columns={columns} dataSource={contractor}/>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
