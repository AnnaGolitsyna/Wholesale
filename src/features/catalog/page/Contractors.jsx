import React, { useState } from 'react';
import { contractorsList } from '../../../gateway/contractor';
import { Typography, Table, Button, Space, theme } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import ModalContractor from '../components/modalContractor/ModalContractor';
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

const { useToken } = theme;

const columns = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
    filters: [
      {
        text: 'Покупатель',
        value: 'buyer',
      },
      {
        text: 'Поставщик',
        value: 'supplier',
      },
      {
        text: 'Универсальный',
        value: 'all-purpose',
      },
    ],
    onFilter: (value, record) => record.category === value,
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
  const [contractors, setContractors] = useState(contractorsList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log('contractor', contractor);

  const { token } = useToken();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (newValue) => {
    console.log(newValue, contractorsList);
    setContractors((prevState) => {
      return [...prevState, newValue];
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space.Compact
        block
        style={{ alignItems: 'baseline', justifyContent: 'space-evenly' }}
      >
        <Typography.Title level={3}>Список контрагентов</Typography.Title>
        <Space size="middle">
          <UserAddOutlined
            style={{ color: token.colorSecondaryBtn, fontSize: 30 }}
          />
          <Button type="primary" onClick={showModal}>
            Создать нового
          </Button>
        </Space>
      </Space.Compact>
      <Table columns={columns} dataSource={contractors} />

      <ModalContractor
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
