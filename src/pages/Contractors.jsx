import React, { useState } from 'react';
import { contractor } from '../gateway/contractor';
import { Typography, Table, Button, Space, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ModalContractor from '../features/invoices/components/modalContractor/ModalContractor';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
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
          <UserAddOutlined style={{ color: '#30c0c4', fontSize: 30 }} />
          <Button type="primary" onClick={showModal}>
            Создать нового
          </Button>
        </Space>
      </Space.Compact>
      <Table columns={columns} dataSource={contractor} />

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
